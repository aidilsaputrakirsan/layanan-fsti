import { NextRequest, NextResponse } from 'next/server';

/**
 * Bagian bersama API Cek Status (app/api/tracking/*) yang memanggil Apps Script
 * apps-script/tracking-api/Tracking.gs. URL Apps Script dan secret hanya ada di server:
 *
 *   TRACKING_GAS_URL_MAHASISWA = https://script.google.com/macros/s/.../exec
 *   TRACKING_GAS_URL_DOSEN     = https://script.google.com/macros/s/.../exec
 *   TRACKING_API_SECRET        = string acak panjang (sama dengan Script Property di Apps Script)
 */

export type Jenis = 'mahasiswa' | 'dosen';

const GAS_URL: Record<Jenis, string | undefined> = {
  mahasiswa: process.env.TRACKING_GAS_URL_MAHASISWA,
  dosen: process.env.TRACKING_GAS_URL_DOSEN,
};

const POLA_ID: Record<Jenis, RegExp> = {
  mahasiswa: /^\d{6,12}$/,
  dosen: /^[0-9A-Za-z.\-]{6,25}$/,
};

export const gagal = (status: number, pesan: string, kode?: string) =>
  NextResponse.json({ ok: false, pesan, kode }, { status });

export const ipDari = (req: NextRequest) => req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'lokal';

/** Pembatas sederhana per IP (per instance server) untuk mencegah permintaan massal */
export function pembatas(batas: number, jendelaMs: number) {
  const jejak = new Map<string, number[]>();
  return (ip: string) => {
    const now = Date.now();
    const list = (jejak.get(ip) || []).filter((t) => now - t < jendelaMs);
    list.push(now);
    jejak.set(ip, list);
    if (jejak.size > 5000) jejak.clear();
    return list.length > batas;
  };
}

/** Memeriksa jenis & NIM/NIP dari body permintaan; mengembalikan pesan galat bila tidak valid. */
export function bacaPemohon(body: { jenis?: string; id?: string }): { jenis: Jenis; id: string } | { galat: string } {
  const jenis: Jenis | null = body.jenis === 'dosen' ? 'dosen' : body.jenis === 'mahasiswa' ? 'mahasiswa' : null;
  const id = String(body.id || '').replace(/\s+/g, '');
  if (!jenis) return { galat: 'Permintaan tidak valid.' };
  if (!POLA_ID[jenis].test(id)) return { galat: jenis === 'mahasiswa' ? 'NIM tidak valid.' : 'NIP tidak valid.' };
  return { jenis, id };
}

export const sudahDikonfigurasi = (jenis: Jenis) => Boolean(GAS_URL[jenis] && process.env.TRACKING_API_SECRET);

/** Memanggil Apps Script; melempar error bila jaringan gagal atau jawaban bukan JSON. */
export async function panggilGas(jenis: Jenis, payload: Record<string, unknown>) {
  // Apps Script menjawab lewat redirect 302; fetch mengikutinya dengan GET (perilaku yang diharapkan)
  const res = await fetch(GAS_URL[jenis]!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.TRACKING_API_SECRET, ...payload }),
    cache: 'no-store',
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  });
  return res.json();
}
