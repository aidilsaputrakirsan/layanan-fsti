/**
 * Penghitung kunjungan situs, disimpan di Upstash Redis (terpisah dari spreadsheet layanan).
 * Dipanggil lewat REST API Upstash, jadi tidak perlu dependency tambahan:
 *
 *   UPSTASH_REDIS_REST_URL   = https://xxxx.upstash.io
 *   UPSTASH_REDIS_REST_TOKEN = token REST dari dashboard Upstash
 *
 * Bila dipasang lewat Vercel Marketplace, nama KV_REST_API_URL / KV_REST_API_TOKEN juga dikenali.
 */

const URL_REDIS = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN_REDIS = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const KUNCI_TOTAL = 'kunjungan:total';
// Tanggal menurut WITA (Balikpapan), format YYYY-MM-DD
const tanggal = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Makassar' }).format(new Date());
const kunciHari = () => `kunjungan:hari:${tanggal()}`;
const kunciBulan = () => `kunjungan:bulan:${tanggal().slice(0, 7)}`;

export type Kunjungan = { total: number; bulanIni: number; hariIni: number };

const keAngka = ([total, bulanIni, hariIni]: unknown[]): Kunjungan => ({
  total: Number(total) || 0,
  bulanIni: Number(bulanIni) || 0,
  hariIni: Number(hariIni) || 0,
});

export const kunjunganDikonfigurasi = () => Boolean(URL_REDIS && TOKEN_REDIS);

async function pipeline(perintah: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${URL_REDIS}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN_REDIS}` },
    body: JSON.stringify(perintah),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const hasil = (await res.json()) as { result?: unknown; error?: string }[];
  return hasil.map((h) => {
    if (h.error) throw new Error(h.error);
    return h.result;
  });
}

/** Menambah satu kunjungan lalu mengembalikan angka terbaru */
export async function catatKunjungan(): Promise<Kunjungan> {
  const hari = kunciHari();
  const bulan = kunciBulan();
  const hasil = await pipeline([
    ['INCR', KUNCI_TOTAL],
    ['INCR', bulan],
    ['INCR', hari],
    ['EXPIRE', bulan, 60 * 60 * 24 * 40],
    ['EXPIRE', hari, 60 * 60 * 48],
  ]);
  return keAngka(hasil);
}

/** Hanya membaca angka kunjungan */
export async function bacaKunjungan(): Promise<Kunjungan> {
  const [hasil] = await pipeline([['MGET', KUNCI_TOTAL, kunciBulan(), kunciHari()]]);
  return keAngka(hasil as unknown[]);
}
