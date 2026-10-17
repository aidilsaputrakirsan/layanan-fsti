import { Check } from 'lucide-react';

const tahap = [
  { nama: 'Diterima', selesai: true },
  { nama: 'Diverifikasi', selesai: true },
  { nama: 'Diproses', aktif: true },
  { nama: 'Selesai' },
];

/** Ilustrasi tiket permohonan di hero (contoh tampilan cek status). */
const TiketContoh = () => (
  <div className="relative mx-auto w-full max-w-sm rotate-[-2.5deg] transition-transform duration-300 hover:rotate-0" aria-hidden>
    <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[4deg] rounded-3xl bg-white/15" />
    <div className="relative overflow-hidden rounded-3xl bg-white text-ink shadow-angkat">
      <div className="flex items-start justify-between px-6 pb-5 pt-6">
        <div>
          <p className="label-kecil text-ink-3">Kode tiket</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-primary-700">M-7K2QDM</p>
        </div>
        <span className="rounded-full bg-sorot-100 px-2.5 py-1 text-xs font-bold text-sorot-700">Diproses</span>
      </div>

      <div className="relative h-4">
        <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-primary-700" />
        <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-primary-700" />
        <div className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-garis" />
      </div>

      <div className="px-6 pb-6 pt-4">
        <p className="text-sm text-ink-3">Layanan</p>
        <p className="font-semibold">Surat Keterangan Aktif Studi</p>
        <div className="mt-1 flex justify-between text-sm text-ink-3">
          <span>Diajukan 14 Okt</span>
          <span>Estimasi 1–2 hari kerja</span>
        </div>

        <ol className="mt-5 grid grid-cols-4 gap-1.5">
          {tahap.map((t) => (
            <li key={t.nama}>
              <span
                className={`block h-1.5 rounded-full ${
                  t.selesai ? 'bg-primary-600' : t.aktif ? 'bg-sorot-400' : 'bg-garis'
                }`}
              />
              <span className={`mt-2 flex items-center gap-1 text-[11px] font-semibold ${t.selesai || t.aktif ? 'text-ink' : 'text-ink-3'}`}>
                {t.selesai && <Check className="h-3 w-3 text-primary-600" />}
                {t.nama}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
    <p className="mt-5 text-center text-xs text-primary-100">Contoh tampilan cek status permohonan</p>
  </div>
);

export default TiketContoh;
