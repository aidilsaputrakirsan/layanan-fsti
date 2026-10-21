import { NextRequest, NextResponse } from 'next/server';
import { bacaPemohon, gagal, ipDari, panggilGas, pembatas, sudahDikonfigurasi } from '@/lib/tracking';

/**
 * Proxy Cek Status ke Apps Script (apps-script/tracking-api/Tracking.gs) — hanya membaca.
 *
 * Spreadsheet tetap privat: Apps Script hanya mengembalikan ringkasan permohonan
 * (layanan, tanggal, status, keterangan, tautan hasil) milik NIM/NIP yang dicari.
 * Konfigurasi environment variable: lihat lib/tracking.ts.
 */

// Mencegah tebak-tebakan NIM/NIP massal
const kebanyakan = pembatas(15, 10 * 60 * 1000);

export async function POST(req: NextRequest) {
  if (kebanyakan(ipDari(req))) return gagal(429, 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.');

  let body: { jenis?: string; id?: string };
  try {
    body = await req.json();
  } catch {
    return gagal(400, 'Permintaan tidak valid.');
  }

  const pemohon = bacaPemohon(body);
  if ('galat' in pemohon) return gagal(400, pemohon.galat);
  const { jenis, id } = pemohon;
  if (!sudahDikonfigurasi(jenis)) return gagal(503, 'Layanan cek status sedang disiapkan.', 'belum-dikonfigurasi');

  try {
    const data = await panggilGas(jenis, { aksi: 'cari', id });
    return NextResponse.json(data, { status: data.ok ? 200 : data.status || 200 });
  } catch {
    return gagal(502, 'Server pelacakan tidak merespons. Coba lagi sebentar lagi.');
  }
}
