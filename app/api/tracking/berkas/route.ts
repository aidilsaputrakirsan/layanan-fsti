import { NextRequest } from 'next/server';
import { bacaPemohon, gagal, ipDari, panggilGas, pembatas, sudahDikonfigurasi } from '@/lib/tracking';

/**
 * Unduh dokumen hasil dari halaman Cek Status.
 *
 * File di Google Drive tidak dibagikan ke publik, jadi diambil oleh Apps Script (berjalan sebagai akun admin)
 * lalu diteruskan ke browser. Apps Script hanya mengirim file yang ID-nya tercantum di kolom hasil
 * permohonan milik NIM/NIP tersebut. Ukuran dibatasi ±4 MB (batas respons server).
 */

export const maxDuration = 60;

const kebanyakan = pembatas(30, 10 * 60 * 1000);

export async function POST(req: NextRequest) {
  if (kebanyakan(ipDari(req))) return gagal(429, 'Terlalu banyak unduhan. Coba lagi dalam beberapa menit.');

  let body: { jenis?: string; id?: string; berkas?: string };
  try {
    body = await req.json();
  } catch {
    return gagal(400, 'Permintaan tidak valid.');
  }

  const pemohon = bacaPemohon(body);
  if ('galat' in pemohon) return gagal(400, pemohon.galat);
  const { jenis, id } = pemohon;
  const berkas = String(body.berkas || '');
  if (!/^[\w-]{20,}$/.test(berkas)) return gagal(400, 'Permintaan tidak valid.');
  if (!sudahDikonfigurasi(jenis)) return gagal(503, 'Layanan cek status sedang disiapkan.', 'belum-dikonfigurasi');

  let data: { ok: boolean; status?: number; kode?: string; pesan?: string; nama?: string; mime?: string; data?: string };
  try {
    data = await panggilGas(jenis, { aksi: 'unduh', id, berkas });
  } catch {
    return gagal(502, 'Server pelacakan tidak merespons. Coba lagi sebentar lagi.');
  }
  if (!data.ok || !data.data) return gagal(data.status || 502, data.pesan || 'Dokumen tidak dapat diunduh.', data.kode);

  const nama = data.nama || 'dokumen-hasil.pdf';
  const namaAscii = nama.replace(/[^\x20-\x7E]/g, '_').replace(/["\\]/g, '_');
  return new Response(Buffer.from(data.data, 'base64'), {
    headers: {
      'Content-Type': data.mime || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${namaAscii}"; filename*=UTF-8''${encodeURIComponent(nama)}`,
      'Cache-Control': 'private, no-store',
    },
  });
}
