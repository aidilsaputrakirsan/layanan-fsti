/**
 * Membaca ukuran nyata tiap berkas di public/file/ dan menulisnya ke
 * lib/data/ukuran-berkas.json.
 *
 * Dijalankan otomatis lewat npm script `prebuild` dan `predev`, sehingga
 * ukuran yang tampil di halaman Peraturan & Kebijakan tidak pernah menyimpang
 * dari berkas yang benar-benar diunduh orang.
 */

import { readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const AKAR_PUBLIK = 'public';
const DIREKTORI_BERKAS = join(AKAR_PUBLIK, 'file');
const KELUARAN = join('lib', 'data', 'ukuran-berkas.json');

/** Menelusuri direktori secara rekursif dan mengembalikan seluruh berkas. */
async function telusuri(dir) {
  const isi = await readdir(dir, { withFileTypes: true });
  const hasil = [];
  for (const entri of isi) {
    const jalur = join(dir, entri.name);
    if (entri.isDirectory()) hasil.push(...(await telusuri(jalur)));
    else hasil.push(jalur);
  }
  return hasil;
}

/** Ukuran yang enak dibaca manusia. MB dibulatkan satu desimal. */
function manusiawi(bita) {
  if (bita < 1024) return `${bita} B`;
  const kb = bita / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

async function jalankan() {
  let berkas;
  try {
    berkas = await telusuri(DIREKTORI_BERKAS);
  } catch {
    console.warn(`[ukuran-berkas] ${DIREKTORI_BERKAS} tidak ada; melewati.`);
    berkas = [];
  }

  const peta = {};
  for (const jalur of berkas) {
    const { size } = await stat(jalur);
    // Kunci memakai URL publik persis seperti yang dipakai di katalog dokumen.
    const url = '/' + relative(AKAR_PUBLIK, jalur).split(sep).join('/');
    peta[url] = { bita: size, teks: manusiawi(size) };
  }

  await mkdir(join('lib', 'data'), { recursive: true });
  await writeFile(KELUARAN, JSON.stringify(peta, null, 2) + '\n', 'utf8');
  console.log(`[ukuran-berkas] ${Object.keys(peta).length} berkas tercatat di ${KELUARAN}`);
}

await jalankan();
