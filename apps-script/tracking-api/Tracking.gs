/**
 * API Cek Status Permohonan FSTI — dipasang di spreadsheet tracking (mahasiswa / dosen).
 *
 * HANYA MEMBACA. Script ini tidak menulis, tidak menambah kolom, tidak memasang trigger,
 * dan tidak mengirim email. Admin tetap bekerja di spreadsheet seperti biasa.
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
 * 3. Services (+) > Google Sheets API > Add  (agar chip file .pdf di kolom hasil ikut terbaca).
 * 4. Pilih fungsi trkIzinkan lalu Run, setujui izin (membaca spreadsheet & file Drive).
 *    Jalankan dengan akun yang bisa membuka file-file hasil di Drive (akun admin).
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
    'silakan download surat anda disini', 'download dokumen'
  ],
  HEADER_SUBJENIS: [
    'jenis surat', 'pilih jenis dokumen', 'jenis rekomendasi', 'keperluan legalisasi', 'jenis dokumen',
    'kehadiran sebagai', 'pilih bidang surat keputusan', 'sarana / prasarana', 'alasan pembuatan suket'
  ],
  MAKS_HASIL: 20,
  // Batas ukuran file yang dikirim lewat website (batas respons server website ±4,5 MB)
  MAKS_UNDUH_BYTE: 4 * 1024 * 1024,
  // Hasil baca disimpan sementara agar cepat; perubahan status oleh admin tampil paling lambat sekian detik
  CACHE_DETIK: 180
};

function trkJenis_() {
  var j = String(PropertiesService.getScriptProperties().getProperty('TRACKING_JENIS') || 'mahasiswa').trim().toLowerCase();
  return j === 'dosen' ? 'dosen' : 'mahasiswa';
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

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hasil = [];
  ss.getSheets().forEach(function (sheet) {
    if (TRK.SHEET_DIKECUALIKAN.indexOf(sheet.getName().trim()) !== -1 || sheet.isSheetHidden()) return;
    var range = sheet.getDataRange();
    var values = range.getValues();
    if (values.length < 2) return;
    var headers = values[0].map(function (h) { return String(h).replace(/\s+/g, ' ').trim().toLowerCase(); });
    var kol = trkPetaKolom_(headers);
    if (!kol.id.length && kol.email === -1) return;

    var barisCocok = [];
    for (var r = 1; r < values.length; r++) {
      if (trkIdBaris_(kol, values[r]) === id) barisCocok.push(r);
    }
    if (!barisCocok.length) return;

    var rich = kol.tautan.length ? range.getRichTextValues() : null;
    barisCocok.forEach(function (r) {
      hasil.push({
        data: trkRingkas_(sheet.getName().trim(), kol, values[r], rich ? rich[r] : null),
        sheet: sheet.getName(),
        sel: kol.tautan.map(function (c) { return trkA1_(r, c); })
      });
    });
  });

  hasil.sort(function (a, b) { return (b.data.tanggal || '').localeCompare(a.data.tanggal || ''); });
  hasil = hasil.slice(0, TRK.MAKS_HASIL);
  trkTautanChip_(ss, hasil);
  hasil = hasil.map(function (h) { return h.data; });
  try { cache.put('cari:' + id, JSON.stringify(hasil), TRK.CACHE_DETIK); } catch (err) {}
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
    tautan: semua(function (x) { return TRK.HEADER_TAUTAN.indexOf(x) !== -1; })
  };
}

function trkIdBaris_(kol, row) {
  for (var i = 0; i < kol.id.length; i++) {
    var v = trkNormId_(row[kol.id[i]]);
    if (v) return v;
  }
  if (kol.email !== -1) {
    var m = String(row[kol.email]).trim().match(/^(\d{6,})@student\.itk\.ac\.id$/i);
    if (m) return m[1];
  }
  return '';
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
    tautan: trkUnikTautan_(tautan).slice(0, 5)
  };
}

/**
 * Admin mengisi kolom hasil dengan chip file Drive (nama file .pdf). Chip tidak selalu terbaca lewat
 * RichTextValue, jadi tautannya dibaca lewat layanan lanjutan Sheets API (langkah pemasangan no. 3).
 * Hanya sel tautan milik baris yang cocok yang diminta. Bila layanan belum aktif atau gagal, dilewati.
 */
function trkTautanChip_(ss, hasil) {
  var ranges = [];
  var pemilik = {};
  hasil.forEach(function (h) {
    h.sel.forEach(function (a1) {
      pemilik[h.sheet + '!' + a1] = h;
      ranges.push("'" + h.sheet.replace(/'/g, "''") + "'!" + a1);
    });
  });
  if (!ranges.length || typeof Sheets === 'undefined') return;
  try {
    var res = Sheets.Spreadsheets.get(ss.getId(), {
      ranges: ranges,
      fields: 'sheets(properties(title),data(startRow,startColumn,rowData(values(hyperlink,chipRuns(chip(richLinkProperties(uri)))))))'
    });
    (res.sheets || []).forEach(function (sh) {
      (sh.data || []).forEach(function (g) {
        var v = g.rowData && g.rowData[0] && g.rowData[0].values && g.rowData[0].values[0];
        var h = pemilik[sh.properties.title + '!' + trkA1_(g.startRow || 0, g.startColumn || 0)];
        if (!v || !h) return;
        var urls = v.hyperlink ? [v.hyperlink] : [];
        (v.chipRuns || []).forEach(function (run) {
          var u = run.chip && run.chip.richLinkProperties && run.chip.richLinkProperties.uri;
          if (u) urls.push(u);
        });
        h.data.tautan = trkUnikTautan_(h.data.tautan.concat(urls)).slice(0, 5);
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

  ss.getSheets().forEach(function (sheet) {
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
  });

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
