import Link from 'next/link';
import { CornerDownLeft, ArrowRight } from 'lucide-react';
import { alurUmum, cabangPerbaikan } from '@/data/standar';

/**
 * Diagram swimlane alur layanan: jalur Pemohon (atas) dan Admin FSTI (bawah).
 * Desktop: node di atas garis SVG (viewBox 1000 × TINGGI, koordinat tetap).
 * Mobile: timeline vertikal.
 */

const TINGGI = 236; // px — tinggi area diagram desktop
const LAJUR = [{ nama: 'Pemohon', y: 46 }, { nama: 'Admin FSTI', y: 138 }];
const Y_PUTAR = 212; // jalur garis "tidak sesuai"

const lajurDari = (oleh: string) => (oleh === 'Pemohon' ? 0 : 1);
const N = alurUmum.length;
const KOLOM = 1000 / N;
const titik = alurUmum.map((a, i) => ({ x: KOLOM * (i + 0.5), y: LAJUR[lajurDari(a.oleh)].y }));

// Garis utama: lurus bila satu lajur, naik/turun di tengah kolom bila pindah lajur
const garisUtama = titik.reduce((d, t, i) => {
  if (i === 0) return `M${t.x},${t.y}`;
  const p = titik[i - 1];
  return p.y === t.y ? `${d} H${t.x}` : `${d} H${(p.x + t.x) / 2} V${t.y} H${t.x}`;
}, '');

const a = titik[cabangPerbaikan.dari];
const b = titik[cabangPerbaikan.ke];
const garisPutar = `M${a.x},${a.y} V${Y_PUTAR} H${b.x} V${b.y}`;

const persen = (x: number, y: number) => ({ left: `${x / 10}%`, top: `${(y / TINGGI) * 100}%` });

const Node = ({ i }: { i: number }) => {
  const admin = lajurDari(alurUmum[i].oleh) === 1;
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl px-2.5 py-2.5 ${
        admin ? 'bg-primary-600 text-white shadow-angkat' : 'border border-garis bg-white text-ink shadow-kartu'
      }`}
      style={{ ...persen(titik[i].x, titik[i].y), width: `${100 / N - 2.25}%` }}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-extrabold tabular-nums ${
          admin ? 'bg-white/15' : 'bg-sorot-400 text-ink'
        }`}
      >
        {i + 1}
      </span>
      <span className="text-[13px] font-bold leading-tight">{alurUmum[i].judul}</span>
    </div>
  );
};

const TautanLangkah = ({ t }: { t: { label: string; href: string } }) => (
  <Link href={t.href} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
    {t.label} <ArrowRight className="h-3.5 w-3.5" />
  </Link>
);

const AlurDiagram = () => (
  <>
    {/* Desktop */}
    <div className="kartu hidden overflow-hidden xl:block">
      <div className="grid grid-cols-[112px_1fr]">
        {/* Label lajur */}
        <div className="border-r border-garis" style={{ height: TINGGI }}>
          {LAJUR.map((l, i) => (
            <div
              key={l.nama}
              className={`flex h-[92px] items-center px-5 text-xs font-bold uppercase tracking-wider ${
                i === 1 ? 'bg-primary-50/70 text-primary-700' : 'text-ink-3'
              }`}
            >
              {l.nama}
            </div>
          ))}
        </div>

        {/* Area diagram */}
        <div className="relative" style={{ height: TINGGI }}>
          <div className="absolute inset-x-0 top-[92px] h-[92px] bg-primary-50/70" aria-hidden />
          <svg viewBox={`0 0 1000 ${TINGGI}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d={garisUtama} fill="none" stroke="#9aaefa" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={garisPutar} fill="none" stroke="#f43f5e" strokeWidth="1.75" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
          </svg>

          {alurUmum.map((_, i) => (
            <Node key={i} i={i} />
          ))}

          {/* Label cabang */}
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200"
            style={persen((a.x + titik[cabangPerbaikan.dari + 1].x) / 2, a.y - 26)}
          >
            Sesuai
          </span>
          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-rose-600 ring-1 ring-rose-200"
            style={persen((a.x + b.x) / 2, Y_PUTAR)}
          >
            <CornerDownLeft className="h-3 w-3" />
            {cabangPerbaikan.label} · kembali ke langkah {cabangPerbaikan.ke + 1}
          </span>
        </div>
      </div>

      {/* Keterangan per langkah, sejajar kolom diagram */}
      <div className="grid grid-cols-[112px_1fr] border-t border-garis">
        <div className="border-r border-garis" />
        <ol className="grid" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
          {alurUmum.map((s, i) => (
            <li key={s.judul} className="px-4 py-5">
              <p className="text-xs font-bold tabular-nums text-ink-3">
                {String(i + 1).padStart(2, '0')} · {s.oleh}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.isi}</p>
              {s.tautan && <TautanLangkah t={s.tautan} />}
            </li>
          ))}
        </ol>
      </div>
      <p className="flex items-start gap-3 border-t border-dashed border-rose-200 bg-rose-50/40 px-5 py-3.5 text-sm text-ink-2">
        <span className="mt-2 w-6 shrink-0 border-t-2 border-dashed border-rose-500" aria-hidden />
        <span>
          <strong className="text-rose-700">{cabangPerbaikan.label}.</strong> {cabangPerbaikan.isi}
        </span>
      </p>
    </div>

    {/* Mobile */}
    <ol className="xl:hidden">
      {alurUmum.map((s, i) => {
        const admin = lajurDari(s.oleh) === 1;
        return (
          <li key={s.judul} className="relative">
            {i < alurUmum.length - 1 && <span className="absolute bottom-0 left-[15px] top-9 w-0.5 bg-primary-200" aria-hidden />}
            <div className="relative flex gap-4 pb-7">
              <span
                className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${
                  admin ? 'bg-primary-600 text-white' : 'bg-sorot-400 text-ink'
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider ${admin ? 'text-primary-700' : 'text-ink-3'}`}>{s.oleh}</p>
                <p className="mt-0.5 font-bold">{s.judul}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.isi}</p>
                {s.tautan && <TautanLangkah t={s.tautan} />}
              </div>
            </div>
            {i === cabangPerbaikan.dari && (
              <div className="relative mb-7 ml-12 rounded-xl border border-dashed border-rose-300 bg-rose-50/60 p-3.5 text-sm text-ink-2">
                <p className="flex items-center gap-1.5 font-bold text-rose-700">
                  <CornerDownLeft className="h-4 w-4" />
                  {cabangPerbaikan.label} · kembali ke langkah {cabangPerbaikan.ke + 1}
                </p>
                <p className="mt-1">{cabangPerbaikan.isi}</p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  </>
);

export default AlurDiagram;
