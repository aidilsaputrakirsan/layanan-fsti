import { NextRequest, NextResponse } from 'next/server';
import { bacaKunjungan, catatKunjungan, kunjunganDikonfigurasi } from '@/lib/kunjungan';
import { gagal, ipDari, pembatas } from '@/lib/tracking';

/**
 * Penghitung kunjungan (lib/kunjungan.ts).
 * GET  → membaca angka; POST → mencatat satu kunjungan (dipanggil sekali per sesi browser).
 */

// Mencegah angka digelembungkan dengan memanggil POST berulang-ulang
const kebanyakan = pembatas(10, 10 * 60 * 1000);

export async function GET() {
  if (!kunjunganDikonfigurasi()) return gagal(503, 'Penghitung kunjungan belum dikonfigurasi.', 'belum-dikonfigurasi');
  try {
    return NextResponse.json({ ok: true, ...(await bacaKunjungan()) });
  } catch {
    return gagal(502, 'Penghitung kunjungan tidak merespons.');
  }
}

export async function POST(req: NextRequest) {
  if (!kunjunganDikonfigurasi()) return gagal(503, 'Penghitung kunjungan belum dikonfigurasi.', 'belum-dikonfigurasi');
  try {
    const data = kebanyakan(ipDari(req)) ? await bacaKunjungan() : await catatKunjungan();
    return NextResponse.json({ ok: true, ...data });
  } catch {
    return gagal(502, 'Penghitung kunjungan tidak merespons.');
  }
}
