/**
 * API Cek Status Permohonan FSTI — dipasang di spreadsheet tracking (mahasiswa / dosen).
 *
 * HANYA MEMBACA. Script ini tidak menulis ke spreadsheet/Drive, tidak menambah kolom, dan tidak
 * mengirim email. Admin tetap bekerja di spreadsheet seperti biasa. Satu-satunya pemicu (opsional)
 * adalah pembangun indeks arsip tiap 4 jam, yang hanya mengisi cache Apps Script.
 *
 * Aksi "rekap" (untuk halaman Dashboard) hanya mengembalikan ANGKA TOTAL per semester:
 * jumlah permohonan, status, per bulan, dan per program studi — tanpa nama/NIM/NIP.
 *
 * Cara kerja: website mengirim NIM/NIP → script mencari baris dengan NIM/NIP itu di setiap
 * sheet → yang dikembalikan hanya: nama layanan (nama sheet), tanggal, status, keterangan admin,
 * dan tautan dokumen hasil. Kolom lain tidak pernah dikirim.
 * Kolom dikenali dari judul kolom (sama seperti Dashboard.gs). Sheet tanpa kolom NIM/NIP dilewati.
 *
 * Aksi "unduh": website meminta file hasil (ID file Drive) untuk NIM/NIP tertentu. File hanya dikirim
 * bila ID itu memang tercantum di kolom tautan hasil milik NIM/NIP tersebut, jadi file Drive lain milik
 * akun ini tidak bisa diminta. File di Drive tidak perlu dibagikan ke publik.
 *
 * ───────────── PEMASANGAN (di masing-masing spreadsheet) ─────────────
 * 1. Extensions > Apps Script > file script "Tracking", tempel isi file ini apa adanya.
 * 2. Project Settings > Script Properties:
 *      TRACKING_JENIS      = mahasiswa   atau   dosen
 *      TRACKING_API_SECRET = string acak panjang (sama dengan env TRACKING_API_SECRET di website;
 *                            boleh sama untuk mahasiswa & dosen)
 *      TRACKING_ARSIP_IDS  = (opsional) ID spreadsheet arsip, pisahkan dengan koma. Dipakai bila
 *                            pengajuan lama dipindah ke spreadsheet lain (mis. "Pengajuan Lama ...").
 *                            ID = bagian URL di antara /d/ dan /edit. Pengajuan di arsip tetap muncul
 *                            di Cek Status dan ikut dihitung di Dashboard (baris yang sama tidak dihitung dua kali).
 * 3. Services (+) > Google Sheets API > Add  (agar chip file .pdf di kolom hasil ikut terbaca).
 * 4. Pilih fungsi trkIzinkan lalu Run, setujui izin (membaca spreadsheet & file Drive).
 *    Jalankan dengan akun yang bisa membuka file-file hasil di Drive (akun admin).
 *    Bila TRACKING_ARSIP_IDS diisi: Run juga trkPasangIndeksArsip SEKALI (memasang pembangun indeks
 *    arsip tiap 4 jam). Setelah memindahkan baris ke arsip, Run trkBangunIndeksArsip agar langsung terbaca.
 * 5. Deploy > New deployment > Web app — Execute as: Me · Who has access: Anyone.
 *    Salin URL "/exec" ke env website (TRACKING_GAS_URL_MAHASISWA / TRACKING_GAS_URL_DOSEN).
 *    Setelah mengubah kode: Deploy > Manage deployments > Edit > Version: New version (URL tetap).
 *
 * Pernah memasang versi lama (kode tiket)? Jalankan trkBersihkan sekali — lihat di bawah.
 */

var TRK = {
  SHEET_DIKECUALIKAN: ['TOTAL'],
  HEADER_STATUS: function (x) { return x.indexOf('status persetujuan') === 0 || x.indexOf('progress layanan') === 0 || x === 'status'; },
  HEADER_KETERANGAN: ['keterangan', 'catatan', 'catatan admin'],
  // Judul kolom (huruf kecil) yang berisi tautan dokumen hasil dari admin
  HEADER_TAUTAN: [
    'link', 'link st', 'link hasil', 'sk', 'file/ dokumen yang sudah di sah kan',
    'silakan download surat anda disini', 'download dokumen', 'dokumen suket kerja', 'berikut nomor sertifikat'
  ],
  // Kolom hasil berupa teks (bukan file) yang ditampilkan apa adanya: judul kolom (huruf kecil) → label di website
  HEADER_HASIL_TEKS: { 'berikut nomor sertifikat': 'Nomor sertifikat' },
  HEADER_SUBJENIS: [
    'jenis surat', 'pilih jenis dokumen', 'jenis rekomendasi', 'keperluan legalisasi', 'jenis dokumen',
    'kehadiran sebagai', 'pilih bidang surat keputusan', 'sarana / prasarana', 'alasan pembuatan suket'
  ],
  MAKS_HASIL: 60,
  // Batas ukuran file yang dikirim lewat website (batas respons server website ±4,5 MB)
  MAKS_UNDUH_BYTE: 4 * 1024 * 1024,
  // Hasil baca disimpan sementara agar cepat; perubahan status oleh admin tampil paling lambat sekian detik
  CACHE_DETIK: 180,
  // Spreadsheet arsip jarang berubah, jadi hasilnya disimpan lebih lama (6 jam, batas maksimum cache Apps Script)
  CACHE_ARSIP_DETIK: 21600
};

function trkJenis_() {
  var j = String(PropertiesService.getScriptProperties().getProperty('TRACKING_JENIS') || 'mahasiswa').trim().toLowerCase();
  return j === 'dosen' ? 'dosen' : 'mahasiswa';
}

// Spreadsheet arsip dari Script Property TRACKING_ARSIP_IDS; yang tidak bisa dibuka dilewati (dicatat di log)
function trkArsip_() {
  var ids = String(PropertiesService.getScriptProperties().getProperty('TRACKING_ARSIP_IDS') || '');
  var aktif = SpreadsheetApp.getActiveSpreadsheet().getId();
  var hasil = [];
  ids.split(/[\s,;]+/).forEach(function (id) {
    if (!id || id === aktif) return;
    try {
      hasil.push(SpreadsheetApp.openById(id));
    } catch (err) {
      Logger.log('Arsip ' + id + ' tidak dapat dibuka: ' + err);
    }
  });
  return hasil;
}

// Baris yang sama bisa ada di spreadsheet utama dan arsip (bila disalin, bukan dipindah): yang pertama dipakai
function trkTanpaGanda_(list, kunci) {
  var lihat = {};
  return list.filter(function (x) {
    var k = kunci(x);
    if (!k) return true;
    if (lihat[k]) return false;
    lihat[k] = true;
    return true;
  });
}

// ───────────────────────────── Web app

function doGet() {
  return trkJson_({ ok: true, layanan: 'tracking-fsti', jenis: trkJenis_(), mode: 'baca-saja' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return trkJson_({ ok: false, status: 400, pesan: 'Permintaan tidak valid.' });
  }
  var secret = PropertiesService.getScriptProperties().getProperty('TRACKING_API_SECRET');
  if (!secret || body.secret !== secret) return trkJson_({ ok: false, status: 403, pesan: 'Akses ditolak.' });

  if (body.aksi === 'rekap') return trkJson_(trkRekap_());

  var id = trkNormId_(body.id);
  if (id && body.aksi === 'unduh') return trkJson_(trkUnduh_(id, String(body.berkas || '')));
  if (!id || body.aksi !== 'cari') return trkJson_({ ok: false, status: 400, pesan: 'Permintaan tidak valid.' });

  var data = trkCari_(id);
  if (!data.length) {
    return trkJson_({ ok: false, status: 404, kode: 'tidak-ditemukan', pesan: 'Tidak ada permohonan dengan ' + (trkJenis_() === 'mahasiswa' ? 'NIM' : 'NIP') + ' tersebut.' });
  }
  return trkJson_({ ok: true, data: data });
}

// ───────────────────────────── Pencarian (baca saja)

function trkCari_(id) {
  var cache = CacheService.getScriptCache();
  var simpan = cache.get('cari:' + id);
  if (simpan) return JSON.parse(simpan);

  // Spreadsheet utama didahulukan: bila baris yang sama ada juga di arsip, status terbaru yang dipakai
  var utama = trkPindai_(SpreadsheetApp.getActiveSpreadsheet(), id).map(function (h) { return h.data; });
  var hasil = trkTanpaGanda_(utama.concat(trkArsipUntuk_(id)), function (p) {
    return p.tanggal ? p.layanan + '|' + p.tanggal : '';
  });
  hasil.sort(function (a, b) { return (b.tanggal || '').localeCompare(a.tanggal || ''); });
  hasil = hasil.slice(0, TRK.MAKS_HASIL);
  try { cache.put('cari:' + id, JSON.stringify(hasil), TRK.CACHE_DETIK); } catch (err) {}
  return hasil;
}

/**
 * Membaca semua sheet di satu spreadsheet. id diisi → hanya baris milik NIM/NIP itu;
 * id null → semua baris (untuk indeks arsip). Hasil: [{ ids: [NIM/NIP di baris], data: ringkasan }].
 */
function trkPindai_(ss, id) {
  var hasil = [];
  var pemilikSel = {}; // 'Nama sheet!A1' -> hasil, untuk menempelkan tautan dari chip file
  var rentangChip = [];
  ss.getSheets().forEach(function (sheet) {
    if (TRK.SHEET_DIKECUALIKAN.indexOf(sheet.getName().trim()) !== -1 || sheet.isSheetHidden()) return;
    var values = sheet.getDataRange().getValues();
    if (values.length < 2) return;
    var headers = values[0].map(function (h) { return String(h).replace(/\s+/g, ' ').trim().toLowerCase(); });
    var kol = trkPetaKolom_(headers);
    if (!kol.id.length && kol.email === -1) return;

    var cocok = [];
    for (var r = 1; r < values.length; r++) {
      var ids = trkIdBaris_(kol, values[r]);
      if (ids.length && (!id || ids.indexOf(id) !== -1)) cocok.push({ r: r, ids: ids });
    }
    if (!cocok.length) return;

    // Hyperlink biasa dibaca per kolom tautan saja (bukan seluruh sheet) agar tetap ringan untuk arsip besar
    var rich = {};
    kol.tautan.forEach(function (c) { rich[c] = sheet.getRange(1, c + 1, values.length, 1).getRichTextValues(); });
    var nama = sheet.getName();
    var kutip = "'" + nama.replace(/'/g, "''") + "'!";
    cocok.forEach(function (x) {
      var richRow = {};
      kol.tautan.forEach(function (c) { richRow[c] = rich[c][x.r][0]; });
      var h = { ids: x.ids, data: trkRingkas_(nama.trim(), kol, values[x.r], richRow) };
      kol.tautan.forEach(function (c) {
        pemilikSel[nama + '!' + trkA1_(x.r, c)] = h;
        if (id) rentangChip.push(kutip + trkA1_(x.r, c));
      });
      hasil.push(h);
    });
    // Mode semua baris: minta satu kolom utuh, bukan ribuan sel satu per satu
    if (!id) kol.tautan.forEach(function (c) { rentangChip.push(kutip + trkA1_(0, c) + ':' + trkA1_(values.length - 1, c)); });
  });

  trkTautanChip_(ss, rentangChip, pemilikSel);
  return hasil;
}

function trkPetaKolom_(h) {
  var cari = function (uji) { for (var i = 0; i < h.length; i++) if (h[i] && uji(h[i])) return i; return -1; };
  var semua = function (uji) { var o = []; for (var i = 0; i < h.length; i++) if (h[i] && uji(h[i])) o.push(i); return o; };
  return {
    status: cari(TRK.HEADER_STATUS),
    id: trkJenis_() === 'mahasiswa'
      ? semua(function (x) { return /^nim\b/.test(x) || x.indexOf('(nim)') !== -1; })
      : semua(function (x) { return /^nip\b/.test(x) || /^niph\b/.test(x) || x.indexOf('(nip)') !== -1; }),
    // Hanya dipakai untuk mengenali NIM dari email kampus (NIM@student.itk.ac.id); email tidak pernah dikirim
    email: trkJenis_() === 'mahasiswa' ? cari(function (x) { return x === 'email address' || x === 'email'; }) : -1,
    keterangan: cari(function (x) { return TRK.HEADER_KETERANGAN.indexOf(x) !== -1; }),
    subjenis: cari(function (x) { return TRK.HEADER_SUBJENIS.some(function (p) { return x.indexOf(p) === 0; }); }),
    // Kolom hasil + kolom keterangan (admin kadang menaruh link dokumen hasil di keterangan)
    tautan: semua(function (x) { return TRK.HEADER_TAUTAN.indexOf(x) !== -1 || TRK.HEADER_KETERANGAN.indexOf(x) !== -1; }),
    hasilTeks: semua(function (x) { return Object.prototype.hasOwnProperty.call(TRK.HEADER_HASIL_TEKS, x); }).map(function (c) {
      return { c: c, label: TRK.HEADER_HASIL_TEKS[h[c]] };
    })
  };
}

// Semua NIM/NIP di baris itu: pengaju dan anggota kelompok (kolom "NIM 2" dst.), atau NIM dari email kampus
function trkIdBaris_(kol, row) {
  var ids = [];
  kol.id.forEach(function (c) {
    var v = trkNormId_(row[c]);
    if (v && ids.indexOf(v) === -1) ids.push(v);
  });
  if (!ids.length && kol.email !== -1) {
    var m = String(row[kol.email]).trim().match(/^(\d{6,})@student\.itk\.ac\.id$/i);
    if (m) ids.push(m[1]);
  }
  return ids;
}

function trkRingkas_(layanan, kol, row, richRow) {
  var tautan = [];
  kol.tautan.forEach(function (c) {
    (String(row[c] || '').match(/https?:\/\/[^\s,;]+/g) || []).forEach(function (u) { tautan.push(u); });
    if (richRow && richRow[c]) {
      richRow[c].getRuns().forEach(function (run) {
        var u = run.getLinkUrl();
        if (u) tautan.push(u);
      });
    }
  });
  var ts = row[0];
  var statusAsli = kol.status !== -1 ? String(row[kol.status]).trim() : '';
  return {
    layanan: layanan,
    jenis: kol.subjenis !== -1 ? String(row[kol.subjenis]).replace(/\s+/g, ' ').trim() : '',
    tanggal: ts instanceof Date && !isNaN(ts.getTime()) ? ts.toISOString() : '',
    status: trkStatus_(statusAsli, kol.status !== -1),
    statusAsli: statusAsli,
    keterangan: kol.keterangan !== -1 ? String(row[kol.keterangan]).trim().slice(0, 1000) : '',
    hasil: kol.hasilTeks.map(function (x) {
      return { label: x.label, isi: String(row[x.c] == null ? '' : row[x.c]).replace(/https?:\/\/\S+/g, '').trim().slice(0, 500) };
    }).filter(function (x) { return x.isi; }),
    tautan: trkUnikTautan_(tautan).slice(0, 5)
  };
}

/**
 * Admin mengisi kolom hasil dengan chip file Drive (nama file .pdf). Chip tidak selalu terbaca lewat
 * RichTextValue, jadi tautannya dibaca lewat layanan lanjutan Sheets API (langkah pemasangan no. 3).
 * Yang diminta hanya sel/kolom tautan (ranges); pemilik memetakan 'Nama sheet!A1' ke hasil pencarian.
 * Bila layanan belum aktif atau gagal, dilewati.
 */
function trkTautanChip_(ss, ranges, pemilik) {
  if (!ranges.length || typeof Sheets === 'undefined') return;
  try {
    var res = Sheets.Spreadsheets.get(ss.getId(), {
      ranges: ranges,
      fields: 'sheets(properties(title),data(startRow,startColumn,rowData(values(hyperlink,chipRuns(chip(richLinkProperties(uri)))))))'
    });
    (res.sheets || []).forEach(function (sh) {
      (sh.data || []).forEach(function (g) {
        (g.rowData || []).forEach(function (baris, i) {
          (baris.values || []).forEach(function (v, j) {
            var h = pemilik[sh.properties.title + '!' + trkA1_((g.startRow || 0) + i, (g.startColumn || 0) + j)];
            if (!v || !h) return;
            var urls = v.hyperlink ? [v.hyperlink] : [];
            (v.chipRuns || []).forEach(function (run) {
              var u = run.chip && run.chip.richLinkProperties && run.chip.richLinkProperties.uri;
              if (u) urls.push(u);
            });
            if (urls.length) h.data.tautan = trkUnikTautan_(h.data.tautan.concat(urls)).slice(0, 5);
          });
        });
      });
    });
  } catch (err) {
    Logger.log('Gagal membaca chip: ' + err);
  }
}

// File Drive yang sama sering ditulis di dua kolom dengan akhiran berbeda (…/view vs …/view?usp=drive_link)
function trkUnikTautan_(list) {
  var lihat = {};
  return list.filter(function (u) {
    var kunci = trkIdDrive_(u) || u;
    if (lihat[kunci]) return false;
    lihat[kunci] = true;
    return true;
  });
}

function trkIdDrive_(u) {
  var m = String(u).match(/(?:drive|docs)\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=|(?:document|spreadsheets|presentation)\/d\/)([\w-]{20,})/);
  return m ? m[1] : '';
}

// Indeks baris & kolom dari getValues() (mulai 0, data mulai A1) → notasi A1, mis. (4, 28) → "AC5"
function trkA1_(r, c) {
  var huruf = '';
  for (var n = c + 1; n > 0; n = Math.floor((n - 1) / 26)) huruf = String.fromCharCode(65 + (n - 1) % 26) + huruf;
  return huruf + (r + 1);
}

// ───────────────────────────── Indeks arsip (dibangun berkala, agar arsip tidak dibaca di setiap pencarian)

/**
 * Seluruh baris arsip diringkas lalu disimpan di cache, dibagi ke 400 kelompok menurut NIM/NIP
 * (tiap kelompok harus < 100 KB; ±12 ribu baris arsip ≈ 10 KB per kelompok). Cache Apps Script paling lama 6 jam, jadi indeks dibangun ulang tiap 4 jam
 * oleh pemicu dari trkPasangIndeksArsip. Tidak ada yang ditulis ke spreadsheet atau Drive.
 * Jalankan manual setelah admin memindahkan baris ke arsip agar langsung terbaca.
 */
function trkBangunIndeksArsip() {
  var mulai = Date.now();
  var kelompok = {};
  var baris = 0;
  trkArsip_().forEach(function (ss) {
    trkPindai_(ss, null).forEach(function (h) {
      baris++;
      h.ids.forEach(function (id) {
        var k = trkIdxKelompok_(id);
        var isi = kelompok[k] || (kelompok[k] = {});
        (isi[id] = isi[id] || []).push(h.data);
      });
    });
  });

  var cache = CacheService.getScriptCache();
  var kunci = Object.keys(kelompok);
  var besar = 0;
  for (var i = 0; i < kunci.length; i += 200) {
    var paket = {};
    kunci.slice(i, i + 200).forEach(function (k) {
      var json = JSON.stringify(kelompok[k]);
      // Kelompok yang terlalu besar tidak disimpan; NIM/NIP di dalamnya dibaca langsung dari arsip
      if (json.length < 95000) paket['idx:' + k] = json; else besar++;
    });
    cache.putAll(paket, TRK.CACHE_ARSIP_DETIK);
  }
  // Ditulis paling akhir: selama belum ada, pencarian membaca arsip langsung seperti biasa
  cache.put('idx:meta', JSON.stringify({ dibuat: Date.now(), kelompok: kunci }), TRK.CACHE_ARSIP_DETIK);
  Logger.log('Indeks arsip: ' + baris + ' baris, ' + kunci.length + ' kelompok' +
    (besar ? ', ' + besar + ' kelompok terlalu besar (dibaca langsung)' : '') + ', ' + ((Date.now() - mulai) / 1000).toFixed(1) + ' detik.');
}

/** Jalankan SEKALI dari editor: memasang pemicu tiap 4 jam lalu langsung membangun indeks pertama. */
function trkPasangIndeksArsip() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'trkBangunIndeksArsip') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('trkBangunIndeksArsip').timeBased().everyHours(4).create();
  trkBangunIndeksArsip();
}

// Sebar NIM/NIP merata ke 400 kelompok (hash sederhana), agar tidak ada kelompok yang membengkak
function trkIdxKelompok_(id) {
  var h = 0;
  for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 400;
  return String(h);
}

// Pengajuan di arsip untuk satu NIM/NIP: dari indeks bila ada, kalau tidak dibaca langsung dari arsip
function trkArsipUntuk_(id) {
  var cache = CacheService.getScriptCache();
  var meta = cache.get('idx:meta');
  if (meta) {
    var k = trkIdxKelompok_(id);
    if (JSON.parse(meta).kelompok.indexOf(k) === -1) return []; // tidak ada NIM/NIP berakhiran ini di arsip
    var isi = cache.get('idx:' + k);
    if (isi) return JSON.parse(isi)[id] || [];
  }
  var simpan = cache.get('arsip:' + id);
  if (simpan) return JSON.parse(simpan);
  var arsip = [];
  trkArsip_().forEach(function (ss) {
    arsip = arsip.concat(trkPindai_(ss, id).map(function (h) { return h.data; }));
  });
  try { cache.put('arsip:' + id, JSON.stringify(arsip), TRK.CACHE_ARSIP_DETIK); } catch (err) {}
  return arsip;
}

// ───────────────────────────── Unduh dokumen hasil (baca saja)

function trkUnduh_(id, berkas) {
  if (!/^[\w-]{20,}$/.test(berkas)) return { ok: false, status: 400, pesan: 'Permintaan tidak valid.' };
  // Hanya file yang tercantum di permohonan milik NIM/NIP ini
  var milik = trkCari_(id).some(function (p) {
    return (p.tautan || []).some(function (u) { return trkIdDrive_(u) === berkas; });
  });
  if (!milik) return { ok: false, status: 404, pesan: 'Dokumen tidak ditemukan.' };

  var file;
  try {
    file = DriveApp.getFileById(berkas);
  } catch (err) {
    return { ok: false, status: 404, kode: 'tidak-terbuka', pesan: 'Dokumen tidak dapat dibuka dari server. Silakan hubungi admin.' };
  }
  var besar = { ok: false, status: 413, kode: 'terlalu-besar', pesan: 'Ukuran dokumen terlalu besar untuk diunduh di sini.' };
  if (file.getSize() > TRK.MAKS_UNDUH_BYTE) return besar;
  var blob = file.getBlob(); // Google Docs/Sheets otomatis menjadi PDF
  var bytes = blob.getBytes();
  if (bytes.length > TRK.MAKS_UNDUH_BYTE) return besar;
  return {
    ok: true,
    nama: blob.getName() || file.getName(),
    mime: blob.getContentType() || 'application/octet-stream',
    data: Utilities.base64Encode(bytes)
  };
}

/** Jalankan sekali dari editor untuk menyetujui izin baca spreadsheet & Drive (langkah pemasangan no. 4). */
function trkIzinkan() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  DriveApp.getFileById(ss.getId()).getName();
  var chip = typeof Sheets !== 'undefined';
  if (chip) Sheets.Spreadsheets.get(ss.getId(), { fields: 'spreadsheetId' });
  Logger.log('Izin OK. Pembacaan chip file: ' + (chip ? 'aktif' : 'BELUM aktif — tambahkan Services > Google Sheets API'));
  Logger.log('Spreadsheet arsip terbaca: ' + (trkArsip_().map(function (a) { return a.getName(); }).join(', ') || '(tidak ada)'));
}

// ───────────────────────────── Rekap untuk Dashboard (hanya angka total, tanpa data pribadi)

/**
 * Rekap per semester: total, komposisi status, jumlah per bulan, dan per program studi.
 * Semester Ganjil = Agustus–Januari, Genap = Februari–Juli (kunci: "2025-ganjil", "2025-genap" untuk TA 2025/2026).
 * Baris tanpa tanggal pengajuan tidak dihitung.
 */
function trkRekap_() {
  var cache = CacheService.getScriptCache();
  var simpan = cache.get('rekap');
  if (simpan) return JSON.parse(simpan);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tz = ss.getSpreadsheetTimeZone();
  var semester = {};
  var namaProdi = {}; // kunci huruf kecil -> nama tampilan pertama yang ditemukan
  var terhitung = {}; // layanan|waktu pengajuan, agar baris yang ada di utama & arsip dihitung sekali

  [ss].concat(trkArsip_()).forEach(function (sumber) { sumber.getSheets().forEach(function (sheet) {
    if (TRK.SHEET_DIKECUALIKAN.indexOf(sheet.getName().trim()) !== -1 || sheet.isSheetHidden()) return;
    var values = sheet.getDataRange().getValues();
    if (values.length < 2) return;
    var h = values[0].map(function (x) { return String(x).replace(/\s+/g, ' ').trim().toLowerCase(); });
    var kStatus = -1, kProdi = -1;
    for (var i = 0; i < h.length; i++) {
      if (kStatus === -1 && h[i] && TRK.HEADER_STATUS(h[i])) kStatus = i;
      if (kProdi === -1 && (h[i] === 'program studi' || h[i] === 'prodi' || h[i].indexOf('jurusan/prodi') === 0)) kProdi = i;
    }

    for (var r = 1; r < values.length; r++) {
      var ts = values[r][0];
      if (!(ts instanceof Date) || isNaN(ts.getTime())) continue;
      var kunciBaris = sheet.getName().trim() + '|' + ts.getTime();
      if (terhitung[kunciBaris]) continue;
      terhitung[kunciBaris] = true;
      var bulan = Utilities.formatDate(ts, tz, 'yyyy-MM');
      var y = Number(bulan.slice(0, 4)), m = Number(bulan.slice(5, 7));
      var kunci = m >= 8 ? y + '-ganjil' : m === 1 ? (y - 1) + '-ganjil' : (y - 1) + '-genap';

      var s = semester[kunci] || (semester[kunci] = {
        total: 0,
        status: { done: 0, progress: 0, waiting: 0, rejected: 0, duplicate: 0, none: 0 },
        bulan: {},
        prodi: {}
      });
      s.total++;
      s.status[kStatus === -1 ? 'none' : trkStatus_(values[r][kStatus], true)]++;
      s.bulan[bulan] = (s.bulan[bulan] || 0) + 1;

      var p = kProdi === -1 ? '' : String(values[r][kProdi]).replace(/\s+/g, ' ').trim();
      if (p.toLowerCase() === 'aktuaria') p = 'Ilmu Aktuaria';
      var pk = p.toLowerCase() || '-';
      if (!(pk in namaProdi)) namaProdi[pk] = p || 'Tidak diisi';
      s.prodi[namaProdi[pk]] = (s.prodi[namaProdi[pk]] || 0) + 1;
    }
  }); });

  var hasil = { ok: true, jenis: trkJenis_(), dibuat: Date.now(), semester: semester };
  try { cache.put('rekap', JSON.stringify(hasil), 1800); } catch (err) {}
  return hasil;
}

// ───────────────────────────── Utilitas

function trkStatus_(value, adaKolom) {
  if (!adaKolom) return 'progress';
  var s = String(value).trim().toLowerCase();
  if (!s) return 'waiting';
  if (s === 'done' || s.indexOf('selesai') !== -1) return 'done';
  if (s.indexOf('tidak') !== -1 || s.indexOf('tolak') !== -1) return 'rejected';
  if (s.indexOf('double') !== -1 || s.indexOf('duplikat') !== -1 || s.indexOf('ganda') !== -1) return 'duplicate';
  return 'progress';
}

function trkNormId_(v) {
  return String(v == null ? '' : v).replace(/\.0$/, '').replace(/[\s.\-]/g, '').toUpperCase();
}

function trkJson_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ───────────────────────────── Pembersihan versi lama (jalankan SEKALI bila pernah memasang versi kode tiket)

/**
 * Menghapus sisa versi lama:
 *  - trigger trkOnFormSubmit / trkOnEdit / trkRebuildIndex (milik akun yang menjalankan fungsi ini)
 *  - kolom berjudul persis "Kode Tiket" yang dulu ditambahkan script di setiap sheet
 * Hasilnya dicatat di Execution log.
 */
function trkBersihkan() {
  var lama = ['trkOnFormSubmit', 'trkOnEdit', 'trkRebuildIndex'];
  var trigger = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (lama.indexOf(t.getHandlerFunction()) !== -1) {
      ScriptApp.deleteTrigger(t);
      trigger++;
    }
  });

  var kolom = [];
  SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(function (sheet) {
    var lastCol = sheet.getLastColumn();
    if (lastCol < 1) return;
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    for (var c = headers.length - 1; c >= 0; c--) {
      if (String(headers[c]).trim() === 'Kode Tiket') {
        sheet.deleteColumn(c + 1);
        kolom.push(sheet.getName());
      }
    }
  });

  Logger.log(trigger + ' trigger dihapus. Kolom "Kode Tiket" dihapus dari: ' + (kolom.join(', ') || '(tidak ada)'));
}
