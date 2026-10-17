/**
 * API Cek Status Permohonan FSTI — dipasang di spreadsheet tracking (mahasiswa / dosen).
 *
 * Fungsi:
 *  1. Membuat KODE TIKET otomatis setiap ada formulir masuk dan mengirimkannya ke email pemohon.
 *  2. Melayani pencarian dari website (NIM/NIP + kode tiket) TANPA membuka spreadsheet ke publik.
 *  3. Mengirim ulang kode tiket ke email terdaftar ("Lupa kode tiket").
 *  4. (Opsional) Mengirim email notifikasi saat kolom status diubah admin menjadi selesai/ditolak.
 *
 * Data dibaca lalu disimpan di CacheService (indeks), sehingga pencarian cepat
 * tanpa membaca semua sheet setiap kali ada permintaan.
 *
 * Satu-satunya perubahan pada spreadsheet: kolom "Kode Tiket" ditambahkan di ujung kanan
 * setiap sheet permohonan dan diisi kode.
 *
 * ───────────── PEMASANGAN (lakukan di masing-masing spreadsheet) ─────────────
 * 1. Extensions > Apps Script > tambah file script "Tracking", tempel isi file ini APA ADANYA
 *    (tidak perlu diedit; file ini aman berdampingan dengan Dashboard.gs di project yang sama).
 * 2. Project Settings > Script Properties, tambahkan:
 *      TRACKING_JENIS      = mahasiswa   atau   dosen   (sesuai spreadsheet ini)
 *      TRACKING_API_SECRET = string acak panjang (sama persis dengan env TRACKING_API_SECRET di website)
 *      SITE_URL            = alamat website, mis. https://layanan-fsti.vercel.app
 *      NOTIFIKASI_STATUS   = ya   (isi "tidak" jika tidak ingin email notifikasi status)
 * 3. Pilih fungsi trkSetup lalu Run (izinkan akses). Ini memasang trigger otomatis.
 * 4. Pilih fungsi trkBackfill lalu Run, untuk memberi kode pada permohonan lama.
 * 5. Deploy > New deployment > Web app:
 *      Execute as: Me   ·   Who has access: Anyone
 *    Salin URL "/exec" ke env website (TRACKING_GAS_URL_MAHASISWA atau TRACKING_GAS_URL_DOSEN).
 *    "Anyone" aman: tanpa secret yang benar, web app tidak mengembalikan data apa pun.
 * 6. Setelah website memakai versi ini, ubah berbagi spreadsheet menjadi "Restricted".
 */

var TRK = {
  KOLOM_KODE: 'Kode Tiket',
  RUANG_PENGAMBILAN: 'ruang B110', // tempat ambil dokumen secara langsung (disebut di email "selesai")
  SHEET_DIKECUALIKAN: ['TOTAL'],
  // Judul kolom (huruf kecil) yang berisi tautan dokumen hasil dari admin
  HEADER_TAUTAN: ['link', 'link st', 'link hasil', 'sk', 'file/ dokumen yang sudah di sah kan'],
  HEADER_KETERANGAN: ['keterangan', 'catatan', 'catatan admin'],
  HEADER_SUBJENIS: [
    'jenis surat', 'pilih jenis dokumen', 'jenis rekomendasi', 'keperluan legalisasi', 'jenis dokumen',
    'kehadiran sebagai', 'pilih bidang surat keputusan', 'sarana / prasarana', 'alasan pembuatan suket'
  ],
  CACHE_DETIK: 21600, // 6 jam (maksimum CacheService)
  INDEKS_BASI_DETIK: 120, // pencarian yang gagal memicu indeks ulang jika indeks lebih tua dari ini
  JEDA_KIRIM_ULANG_DETIK: 900
};

/** Jenis spreadsheet dari Script Property TRACKING_JENIS: 'mahasiswa' (default) atau 'dosen'. */
function trkJenis_() {
  var j = String(PropertiesService.getScriptProperties().getProperty('TRACKING_JENIS') || 'mahasiswa').trim().toLowerCase();
  return j === 'dosen' ? 'dosen' : 'mahasiswa';
}

/** Awalan kode tiket: M untuk mahasiswa, D untuk dosen. */
function trkPrefix_() {
  return trkJenis_() === 'dosen' ? 'D' : 'M';
}

var TRK_ABJAD = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// ───────────────────────────── Pemasangan

function trkSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var handler = ['trkOnFormSubmit', 'trkOnEdit', 'trkRebuildIndex'];
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (handler.indexOf(t.getHandlerFunction()) !== -1) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('trkOnFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
  ScriptApp.newTrigger('trkOnEdit').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('trkRebuildIndex').timeBased().everyMinutes(10).create();
  trkRebuildIndex();
  Logger.log('Trigger terpasang dan indeks dibuat.');
}

/** Memberi kode pada semua baris yang belum punya kode (tanpa mengirim email). */
function trkBackfill() {
  var total = 0;
  trkSheets_().forEach(function (sheet) {
    var values = sheet.getDataRange().getValues();
    if (values.length < 2) return;
    var col = trkKolomKode_(sheet);
    var kode = sheet.getRange(2, col + 1, values.length - 1, 1).getValues();
    var berubah = false;
    for (var r = 1; r < values.length; r++) {
      if (!trkBarisBerisi_(values[r]) || String(kode[r - 1][0]).trim()) continue;
      kode[r - 1][0] = trkKodeBaru_();
      berubah = true;
      total++;
    }
    if (berubah) sheet.getRange(2, col + 1, kode.length, 1).setValues(kode);
  });
  trkRebuildIndex();
  Logger.log(total + ' baris diberi kode tiket.');
}

// ───────────────────────────── Trigger

function trkOnFormSubmit(e) {
  var sheet = e.range.getSheet();
  if (!trkSheetDipakai_(sheet)) return;
  var row = e.range.getRow();
  var col = trkKolomKode_(sheet);
  var sel = sheet.getRange(row, col + 1);
  var kode = String(sel.getValue()).trim();
  if (!kode) {
    kode = trkKodeBaru_();
    sel.setValue(kode);
  }
  var rec = trkBacaBaris_(sheet, row);
  if (!rec) return;
  trkSimpanRecord_(rec);
  if (rec.email) {
    trkKirimEmail_(rec.email, 'Kode tiket permohonan Anda: ' + kode,
      '<p>Permohonan <b>' + trkEsc_(rec.layanan) + '</b> sudah kami terima.</p>' +
      '<p style="font-size:22px;letter-spacing:2px"><b>' + kode + '</b></p>' +
      '<p>Simpan kode ini. Cek status kapan saja di <a href="' + trkUrlTracking_() + '">' + trkUrlTracking_() + '</a> ' +
      'dengan ' + (trkJenis_() === 'mahasiswa' ? 'NIM' : 'NIP') + ' dan kode tiket.</p>');
  }
}

function trkOnEdit(e) {
  try {
    if (!e || !e.range || e.range.getNumRows() !== 1 || e.range.getNumColumns() !== 1) return;
    var sheet = e.range.getSheet();
    if (!trkSheetDipakai_(sheet) || e.range.getRow() < 2) return;
    var headers = trkHeaders_(sheet);
    var kolom = trkPetaKolom_(headers);
    if (e.range.getColumn() - 1 !== kolom.status) return;

    var rec = trkBacaBaris_(sheet, e.range.getRow());
    if (!rec || !rec.kode) return;
    trkSimpanRecord_(rec);

    var notif = String(PropertiesService.getScriptProperties().getProperty('NOTIFIKASI_STATUS') || 'ya').toLowerCase();
    var lama = trkStatus_(e.oldValue || '', true);
    if (notif === 'tidak' || !rec.email || lama === rec.status) return;
    if (rec.status !== 'done' && rec.status !== 'rejected') return;

    var selesai = rec.status === 'done';
    trkKirimEmail_(rec.email,
      (selesai ? 'Permohonan selesai: ' : 'Permohonan perlu perbaikan: ') + rec.kode,
      '<p>Status permohonan <b>' + trkEsc_(rec.layanan) + '</b> (kode <b>' + rec.kode + '</b>) kini: ' +
      '<b>' + (selesai ? 'Selesai' : 'Ditolak / perlu perbaikan') + '</b>.</p>' +
      (rec.keterangan ? '<p>Catatan admin: ' + trkEsc_(rec.keterangan) + '</p>' : '') +
      '<p>Lihat detail' + (selesai ? ' dan dokumen hasil' : '') + ' di <a href="' + trkUrlTracking_() + '">' + trkUrlTracking_() + '</a>.</p>' +
      (selesai
        ? '<p>Dokumen dapat diunduh lewat tautan di halaman tersebut atau diambil langsung di <b>' + TRK.RUANG_PENGAMBILAN + '</b>.</p>' +
          '<p>Jangan lupa isi <a href="' + trkUrlSitus_() + '/survey-kepuasan">survei kepuasan</a> ya. ' +
          'Penilaian Anda membantu perbaikan pelayanan kami.</p>'
        : ''));
  } catch (err) {
    console.error(err);
  }
}

// ───────────────────────────── Web app

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
  if (!id) return trkJson_({ ok: false, status: 400, pesan: 'Data tidak lengkap.' });

  if (body.aksi === 'cari') return trkJson_(trkCari_(id, String(body.kode || '').trim().toUpperCase()));
  if (body.aksi === 'kirim-kode') return trkJson_(trkKirimUlang_(id));
  return trkJson_({ ok: false, status: 400, pesan: 'Aksi tidak dikenal.' });
}

function doGet() {
  return trkJson_({ ok: true, layanan: 'tracking-fsti', jenis: trkJenis_() });
}

function trkCari_(id, kode) {
  var cache = CacheService.getScriptCache();
  var raw = cache.get('k:' + kode);
  if (!raw && trkIndeksBasi_()) {
    trkRebuildIndex();
    raw = cache.get('k:' + kode);
  }
  var rec = raw ? JSON.parse(raw) : null;
  if (!rec || rec.id !== id) {
    return { ok: false, status: 404, kode: 'tidak-ditemukan', pesan: 'Permohonan tidak ditemukan.' };
  }
  return {
    ok: true,
    data: {
      kode: rec.kode,
      layanan: rec.layanan,
      jenis: rec.jenis,
      tanggal: rec.tanggal,
      status: rec.status,
      statusAsli: rec.statusAsli,
      keterangan: rec.keterangan,
      tautan: rec.tautan
    }
  };
}

function trkKirimUlang_(id) {
  var generik = { ok: true, pesan: 'Jika data ditemukan, kode tiket dikirim ke email yang Anda isi saat mengajukan.' };
  var cache = CacheService.getScriptCache();
  if (cache.get('r:' + id)) return generik;
  cache.put('r:' + id, '1', TRK.JEDA_KIRIM_ULANG_DETIK);

  if (trkIndeksBasi_() || !cache.get('idx')) trkRebuildIndex();
  var daftar = JSON.parse(cache.get('n:' + id) || '[]');
  if (!daftar.length) return generik;

  var raw = cache.getAll(daftar.map(function (k) { return 'k:' + k; }));
  var perEmail = {};
  Object.keys(raw).forEach(function (key) {
    var rec = JSON.parse(raw[key]);
    if (!rec.email) return;
    (perEmail[rec.email] = perEmail[rec.email] || []).push(rec);
  });
  Object.keys(perEmail).forEach(function (email) {
    var baris = perEmail[email]
      .sort(function (a, b) { return (b.tanggal || '').localeCompare(a.tanggal || ''); })
      .slice(0, 30)
      .map(function (r) {
        return '<tr><td style="padding:4px 12px 4px 0"><b>' + r.kode + '</b></td><td style="padding:4px 12px 4px 0">' +
          trkEsc_(r.layanan) + '</td><td>' + (r.tanggal ? r.tanggal.slice(0, 10) : '') + '</td></tr>';
      }).join('');
    trkKirimEmail_(email, 'Kode tiket permohonan Anda',
      '<p>Berikut kode tiket permohonan yang terdaftar dengan email ini:</p><table>' + baris + '</table>' +
      '<p>Cek status di <a href="' + trkUrlTracking_() + '">' + trkUrlTracking_() + '</a>.</p>' +
      '<p style="color:#777">Abaikan email ini jika Anda tidak memintanya.</p>');
  });
  return generik;
}

// ───────────────────────────── Indeks

function trkRebuildIndex() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    var cache = CacheService.getScriptCache();
    var nilai = {};
    var perId = {};
    trkSheets_().forEach(function (sheet) {
      trkBacaSheet_(sheet).forEach(function (rec) {
        nilai['k:' + rec.kode] = JSON.stringify(rec);
        if (rec.id) (perId[rec.id] = perId[rec.id] || []).push(rec.kode);
      });
    });
    Object.keys(perId).forEach(function (id) { nilai['n:' + id] = JSON.stringify(perId[id]); });
    nilai.idx = String(Date.now());
    var kunci = Object.keys(nilai);
    for (var i = 0; i < kunci.length; i += 200) {
      var potong = {};
      kunci.slice(i, i + 200).forEach(function (k) { potong[k] = nilai[k]; });
      cache.putAll(potong, TRK.CACHE_DETIK);
    }
  } finally {
    lock.releaseLock();
  }
}

function trkIndeksBasi_() {
  var t = Number(CacheService.getScriptCache().get('idx') || 0);
  return Date.now() - t > TRK.INDEKS_BASI_DETIK * 1000;
}

function trkSimpanRecord_(rec) {
  var cache = CacheService.getScriptCache();
  cache.put('k:' + rec.kode, JSON.stringify(rec), TRK.CACHE_DETIK);
  if (rec.id) {
    var daftar = JSON.parse(cache.get('n:' + rec.id) || '[]');
    if (daftar.indexOf(rec.kode) === -1) daftar.push(rec.kode);
    cache.put('n:' + rec.id, JSON.stringify(daftar), TRK.CACHE_DETIK);
  }
}

// ───────────────────────────── Membaca sheet

function trkSheets_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets().filter(trkSheetDipakai_);
}

function trkSheetDipakai_(sheet) {
  return TRK.SHEET_DIKECUALIKAN.indexOf(sheet.getName().trim()) === -1 && !sheet.isSheetHidden();
}

function trkHeaders_(sheet) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
    return String(h).replace(/\s+/g, ' ').trim().toLowerCase();
  });
}

function trkPetaKolom_(h) {
  var cari = function (uji) { for (var i = 0; i < h.length; i++) if (h[i] && uji(h[i])) return i; return -1; };
  var semua = function (uji) { var o = []; for (var i = 0; i < h.length; i++) if (h[i] && uji(h[i])) o.push(i); return o; };
  return {
    kode: cari(function (x) { return x === TRK.KOLOM_KODE.toLowerCase(); }),
    status: cari(function (x) { return x.indexOf('status persetujuan') === 0 || x.indexOf('progress layanan') === 0 || x === 'status'; }),
    id: trkJenis_() === 'mahasiswa'
      ? semua(function (x) { return /^nim\b/.test(x) || x.indexOf('(nim)') !== -1; })
      : semua(function (x) { return /^nip\b/.test(x) || /^niph\b/.test(x) || x.indexOf('(nip)') !== -1; }),
    email: cari(function (x) { return x === 'email address' || x === 'email' || x === 'alamat email'; }),
    keterangan: cari(function (x) { return TRK.HEADER_KETERANGAN.indexOf(x) !== -1; }),
    subjenis: cari(function (x) { return TRK.HEADER_SUBJENIS.some(function (p) { return x.indexOf(p) === 0; }); }),
    tautan: semua(function (x) { return TRK.HEADER_TAUTAN.indexOf(x) !== -1; })
  };
}

function trkKolomKode_(sheet) {
  var headers = trkHeaders_(sheet);
  var i = headers.indexOf(TRK.KOLOM_KODE.toLowerCase());
  if (i !== -1) return i;
  var col = sheet.getLastColumn() + 1;
  sheet.getRange(1, col).setValue(TRK.KOLOM_KODE).setFontWeight('bold');
  return col - 1;
}

function trkBacaSheet_(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  if (values.length < 2) return [];
  var headers = values[0].map(function (h) { return String(h).replace(/\s+/g, ' ').trim().toLowerCase(); });
  var kol = trkPetaKolom_(headers);
  if (kol.kode === -1) return [];
  var rich = kol.tautan.length ? range.getRichTextValues() : null;
  var hasil = [];
  for (var r = 1; r < values.length; r++) {
    var rec = trkRecord_(sheet, headers, kol, values[r], rich ? rich[r] : null);
    if (rec) hasil.push(rec);
  }
  return hasil;
}

function trkBacaBaris_(sheet, row) {
  var headers = trkHeaders_(sheet);
  var kol = trkPetaKolom_(headers);
  var range = sheet.getRange(row, 1, 1, headers.length);
  return trkRecord_(sheet, headers, kol, range.getValues()[0], kol.tautan.length ? range.getRichTextValues()[0] : null);
}

function trkRecord_(sheet, headers, kol, row, richRow) {
  var kode = kol.kode !== -1 ? String(row[kol.kode]).trim().toUpperCase() : '';
  if (!kode) return null;

  var id = '';
  kol.id.forEach(function (c) { if (!id) id = trkNormId_(row[c]); });
  var email = kol.email !== -1 ? String(row[kol.email]).trim() : '';
  if (!id && trkJenis_() === 'mahasiswa') {
    var m = email.match(/^(\d{6,})@student\.itk\.ac\.id$/i);
    if (m) id = m[1];
  }

  var tautan = [];
  kol.tautan.forEach(function (c) {
    var teks = String(row[c] || '');
    (teks.match(/https?:\/\/[^\s,;]+/g) || []).forEach(function (u) { tautan.push(u); });
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
    kode: kode,
    id: id,
    email: /@/.test(email) ? email : '',
    layanan: sheet.getName().trim(),
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

function trkBarisBerisi_(row) {
  return row.some(function (v) { return String(v).trim() !== ''; });
}

function trkNormId_(v) {
  return String(v == null ? '' : v).replace(/\.0$/, '').replace(/[\s.\-]/g, '').toUpperCase();
}

function trkKodeBaru_() {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid() + Date.now());
  var s = '';
  for (var i = 0; i < 6; i++) s += TRK_ABJAD.charAt((bytes[i] + 256) % TRK_ABJAD.length);
  return trkPrefix_() + '-' + s;
}

function trkUrlSitus_() {
  return String(PropertiesService.getScriptProperties().getProperty('SITE_URL') || '').replace(/\/$/, '');
}

function trkUrlTracking_() {
  return trkUrlSitus_() + '/tracking?jenis=' + trkJenis_();
}

function trkKirimEmail_(to, subjek, html) {
  try {
    MailApp.sendEmail({
      to: to,
      subject: '[Layanan FSTI] ' + subjek,
      htmlBody: '<div style="font-family:Arial,sans-serif;font-size:14px;color:#151a2d">' + html +
        '<p style="color:#777;font-size:12px">Email otomatis dari Layanan FSTI ITK. Mohon tidak membalas email ini.</p></div>',
      name: 'Layanan FSTI ITK'
    });
  } catch (err) {
    console.error('Gagal kirim email ke ' + to + ': ' + err);
  }
}

function trkEsc_(s) {
  return String(s || '').replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

function trkJson_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
