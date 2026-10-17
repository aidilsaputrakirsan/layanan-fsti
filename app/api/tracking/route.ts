import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy pelacakan permohonan ke Apps Script (apps-script/tracking-api/Tracking.gs).
 *
 * Spreadsheet tetap privat: Apps Script hanya mengembalikan SATU permohonan
 * yang cocok dengan NIM/NIP + kode tiket. URL Apps Script dan secret disimpan
 * di environment variable server (tidak pernah dikirim ke browser):
 *
 *   TRACKING_GAS_URL_MAHASISWA = https://script.google.com/macros/s/.../exec
 *   TRACKING_GAS_URL_DOSEN     = https://script.google.com/macros/s/.../exec
 *   TRACKING_API_SECRET        = string acak panjang (sama dengan Script Property di Apps Script)
 */

type Jenis = 'mahasiswa' | 'dosen';

const GAS_URL: Record<Jenis, string | undefined> = {
  mahasiswa: process.env.TRACKING_GAS_URL_MAHASISWA,
  dosen: process.env.TRACKING_GAS_URL_DOSEN,
};

const POLA_ID: Record<Jenis, RegExp> = {
  mahasiswa: /^\d{6,12}$/,
  dosen: /^[0-9A-Za-z.\-]{6,25}$/,
};
const POLA_KODE = /^[MD]-[A-Z0-9]{6}$/;

// Pembatas sederhana per IP (per instance server)
const jejak = new Map<string, number[]>();
const BATAS = 20;
const JENDELA_MS = 10 * 60 * 1000;

function kebanyakan(ip: string) {
  const now = Date.now();
  const list = (jejak.get(ip) || []).filter((t) => now - t < JENDELA_MS);
  list.push(now);
  jejak.set(ip, list);
  if (jejak.size > 5000) jejak.clear();
  return list.length > BATAS;
}

const gagal = (status: number, pesan: string, kode?: string) =>
  NextResponse.json({ ok: false, pesan, kode }, { status });

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'lokal';
  if (kebanyakan(ip)) return gagal(429, 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.');

  let body: { aksi?: string; jenis?: string; id?: string; kode?: string };
  try {
    body = await req.json();
  } catch {
    return gagal(400, 'Permintaan tidak valid.');
  }

  const jenis = body.jenis === 'dosen' ? 'dosen' : body.jenis === 'mahasiswa' ? 'mahasiswa' : null;
  const aksi = body.aksi === 'kirim-kode' ? 'kirim-kode' : body.aksi === 'cari' ? 'cari' : null;
  const id = String(body.id || '').replace(/\s+/g, '');
  const kode = String(body.kode || '').trim().toUpperCase();

  if (!jenis || !aksi) return gagal(400, 'Permintaan tidak valid.');
  if (!POLA_ID[jenis].test(id)) return gagal(400, jenis === 'mahasiswa' ? 'NIM tidak valid.' : 'NIP tidak valid.');
  if (aksi === 'cari' && !POLA_KODE.test(kode)) return gagal(400, 'Format kode tiket tidak valid (contoh: M-7K2QDM).');

  const url = GAS_URL[jenis];
  const secret = process.env.TRACKING_API_SECRET;
  if (!url || !secret) return gagal(503, 'Layanan cek status sedang disiapkan.', 'belum-dikonfigurasi');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, aksi, id, kode }),
      cache: 'no-store',
      redirect: 'follow',
      signal: AbortSignal.timeout(25000),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: data.ok ? 200 : data.status || 200 });
  } catch {
    return gagal(502, 'Server pelacakan tidak merespons. Coba lagi sebentar lagi.');
  }
}
