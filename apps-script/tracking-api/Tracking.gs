/**
 * API Cek Status Permohonan FSTI — dipasang di spreadsheet tracking (mahasiswa / dosen).
 *
 * HANYA MEMBACA. Script ini tidak menulis, tidak menambah kolom, tidak memasang trigger,
 * dan tidak mengirim email. Admin tetap bekerja di spreadsheet seperti biasa.
 *
 * Cara kerja: website mengirim NIM/NIP → script mencari baris dengan NIM/NIP itu di setiap
 * sheet → yang dikembalikan hanya: nama layanan (nama sheet), tanggal, status, keterangan admin,
 * dan tautan dokumen hasil. Kolom lain tidak pernah dikirim.
 * Kolom dikenali dari judul kolom (sama seperti Dashboard.gs). Sheet tanpa kolom NIM/NIP dilewati.
 *
 * ───────────── PEMASANGAN (di masing-masing spreadsheet) ─────────────
 * 1. Extensions > Apps Script > file script "Tracking", tempel isi file ini apa adanya.
 * 2. Project Settings > Script Properties:
 *      TRACKING_JENIS      = mahasiswa   atau   dosen
 *      TRACKING_API_SECRET = string acak panjang (sama dengan env TRACKING_API_SECRET di website;
 *                            boleh sama untuk mahasiswa & dosen)
 * 3. Deploy > New deployment > Web app — Execute as: Me · Who has access: Anyone.
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
  HEADER_TAUTAN: ['link', 'link st', 'link hasil', 'sk', 'file/ dokumen yang sudah di sah kan'],
  HEADER_SUBJENIS: [
    'jenis surat', 'pilih jenis dokumen', 'jenis rekomendasi', 'keperluan legalisasi', 'jenis dokumen',
    'kehadiran sebagai', 'pilih bidang surat keputusan', 'sarana / prasarana', 'alasan pembuatan suket'
  ],
  MAKS_HASIL: 20,
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

  var id = trkNormId_(body.id);
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

  var hasil = [];
  SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(function (sheet) {
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
      hasil.push(trkRingkas_(sheet.getName().trim(), kol, values[r], rich ? rich[r] : null));
    });
  });

  hasil.sort(function (a, b) { return (b.tanggal || '').localeCompare(a.tanggal || ''); });
  hasil = hasil.slice(0, TRK.MAKS_HASIL);
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
    tautan: tautan.filter(function (u, i) { return tautan.indexOf(u) === i; }).slice(0, 5)
  };
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
