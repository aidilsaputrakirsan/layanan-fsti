/**
 * Pencarian katalog layanan.
 *
 * Menjawab masalah nyata pengguna: judul layanan bertabrakan lintas kategori
 * ("Pendaftaran Seminar Hasil" ada di Magang, di Tugas Akhir, dan di MBKM),
 * sehingga hasil pencarian TIDAK boleh berupa judul telanjang. Setiap hasil
 * membawa jalur lengkapnya, agar pengguna langsung tahu yang mana miliknya.
 */

import {
  LAYANAN,
  resolveTujuan,
  type Layanan,
  type LayananItem,
  type Peran,
  type Teks,
  type Tujuan,
} from '@/lib/data/layanan';

export type Bahasa = 'id' | 'en';

export function teks(t: Teks, bahasa: Bahasa): string {
  return bahasa === 'en' ? (t.en ?? t.id) : t.id;
}

/** Satu tautan yang bisa dituju, lengkap dengan jalur dan alamatnya sendiri. */
export interface Hasil {
  slug: string;
  label: Teks;
  url: string;
  tujuan: Tujuan;
  peran: Peran;
  /** Layanan induk. */
  layanan: Layanan;
  /** Nama kelompok bila layanan induk punya sub-kelompok. */
  kelompok?: Teks;
  skor: number;
}

/** Membuang diakritik dan menyeragamkan pemisah agar cocok dengan ketikan apa adanya. */
function normalkan(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Meratakan katalog dua tingkat menjadi satu daftar tautan yang bisa dicari. */
export function ratakan(katalog: Layanan[] = LAYANAN): Omit<Hasil, 'skor'>[] {
  const keluar: Omit<Hasil, 'skor'>[] = [];
  for (const layanan of katalog) {
    if (layanan.kelompok?.length) {
      for (const kelompok of layanan.kelompok) {
        for (const item of kelompok.items) {
          keluar.push({
            slug: item.slug,
            label: item.label,
            url: item.url,
            tujuan: resolveTujuan(item.url),
            peran: layanan.peran,
            layanan,
            // Kelompok bernama sama dengan layanan induknya tidak menambah
            // informasi apa pun; sembunyikan agar jalur tidak mengulang diri.
            kelompok:
              normalkan(kelompok.label.id) === normalkan(layanan.title.id)
                ? undefined
                : kelompok.label,
          });
        }
      }
    } else if (layanan.url) {
      keluar.push({
        slug: layanan.id,
        label: layanan.title,
        url: layanan.url,
        tujuan: resolveTujuan(layanan.url),
        peran: layanan.peran,
        layanan,
      });
    }
  }
  return keluar;
}

/** Semua teks yang boleh dicocokkan untuk satu tautan, dari yang paling penting. */
function ladangCari(h: Omit<Hasil, 'skor'>): { teks: string; bobot: number }[] {
  const item = h.label;
  const ladang: { teks: string; bobot: number }[] = [
    { teks: normalkan(item.id), bobot: 10 },
  ];
  if (item.en) ladang.push({ teks: normalkan(item.en), bobot: 10 });

  const sumberItem = cariItemAsli(h);
  for (const a of sumberItem?.alias ?? []) {
    ladang.push({ teks: normalkan(a), bobot: 8 });
  }
  if (h.kelompok) {
    ladang.push({ teks: normalkan(h.kelompok.id), bobot: 5 });
    if (h.kelompok.en) ladang.push({ teks: normalkan(h.kelompok.en), bobot: 5 });
  }
  ladang.push({ teks: normalkan(h.layanan.title.id), bobot: 4 });
  if (h.layanan.title.en) ladang.push({ teks: normalkan(h.layanan.title.en), bobot: 4 });
  ladang.push({ teks: normalkan(h.layanan.unit.id), bobot: 3 });
  ladang.push({ teks: normalkan(h.layanan.description.id), bobot: 2 });
  return ladang;
}

function cariItemAsli(h: Omit<Hasil, 'skor'>): LayananItem | undefined {
  for (const kelompok of h.layanan.kelompok ?? []) {
    const ketemu = kelompok.items.find((i) => i.slug === h.slug);
    if (ketemu) return ketemu;
  }
  return undefined;
}

/**
 * Menilai satu tautan terhadap kueri.
 *
 * Semua kata kunci harus ketemu (AND), sehingga "seminar hasil ta" menyempit
 * alih-alih melebar. Kata yang diawali di batas kata dinilai lebih tinggi
 * daripada yang sekadar tertanam di tengah kata.
 */
function nilai(h: Omit<Hasil, 'skor'>, kataKunci: string[]): number {
  const ladang = ladangCari(h);
  let total = 0;
  for (const kata of kataKunci) {
    let terbaik = 0;
    for (const { teks: t, bobot } of ladang) {
      if (!t.includes(kata)) continue;
      const diAwalKata = new RegExp(`(^| )${kata}`).test(t);
      const persisPenuh = t === kata;
      terbaik = Math.max(terbaik, bobot * (persisPenuh ? 3 : diAwalKata ? 2 : 1));
    }
    if (terbaik === 0) return 0; // satu kata tidak ketemu → bukan hasil
    total += terbaik;
  }
  return total;
}

export interface OpsiCari {
  kueri: string;
  peran: Peran | 'semua';
  katalog?: Layanan[];
}

export function cari({ kueri, peran, katalog = LAYANAN }: OpsiCari): Hasil[] {
  const semua = ratakan(katalog).filter((h) => peran === 'semua' || h.peran === peran);
  const kataKunci = normalkan(kueri).split(' ').filter(Boolean);

  if (kataKunci.length === 0) return [];

  return semua
    .map((h) => ({ ...h, skor: nilai(h, kataKunci) }))
    .filter((h) => h.skor > 0)
    .sort((a, b) => b.skor - a.skor || teks(a.label, 'id').localeCompare(teks(b.label, 'id')));
}

/** Memotong teks menjadi penggal cocok / tidak cocok untuk disorot di layar. */
export function penggalSorot(sumber: string, kueri: string): { teks: string; cocok: boolean }[] {
  const kataKunci = normalkan(kueri).split(' ').filter(Boolean);
  if (kataKunci.length === 0) return [{ teks: sumber, cocok: false }];

  // `normalkan` bisa mengubah panjang string, jadi peta indeks dibangun ulang
  // agar sorotan jatuh tepat di atas karakter aslinya.
  const petaIndeks: number[] = [];
  let normal = '';
  let spasiTertunda = false;
  for (let i = 0; i < sumber.length; i++) {
    const c = sumber[i]
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (/[a-z0-9]/.test(c)) {
      if (spasiTertunda && normal.length > 0) {
        normal += ' ';
        petaIndeks.push(i);
        spasiTertunda = false;
      }
      normal += c;
      petaIndeks.push(i);
    } else {
      spasiTertunda = true;
    }
  }

  const ditandai = new Array<boolean>(sumber.length).fill(false);
  for (const kata of kataKunci) {
    let dari = 0;
    for (;;) {
      const pos = normal.indexOf(kata, dari);
      if (pos === -1) break;
      for (let k = pos; k < pos + kata.length; k++) {
        const asli = petaIndeks[k];
        if (asli !== undefined) ditandai[asli] = true;
      }
      dari = pos + kata.length;
    }
  }

  const penggal: { teks: string; cocok: boolean }[] = [];
  let mulai = 0;
  for (let i = 1; i <= sumber.length; i++) {
    if (i === sumber.length || ditandai[i] !== ditandai[mulai]) {
      penggal.push({ teks: sumber.slice(mulai, i), cocok: ditandai[mulai] });
      mulai = i;
    }
  }
  return penggal;
}

/** Jumlah tautan yang tersedia untuk sebuah peran. Dipakai pada legenda papan. */
export function jumlahTautan(peran: Peran | 'semua', katalog: Layanan[] = LAYANAN): number {
  return ratakan(katalog).filter((h) => peran === 'semua' || h.peran === peran).length;
}
