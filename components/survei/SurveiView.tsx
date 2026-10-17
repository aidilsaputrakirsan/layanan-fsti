"use client";

import { useState } from 'react';
import { ExternalLink, GraduationCap, Presentation, Handshake, Building2 } from 'lucide-react';

const SURVEI = [
  {
    id: 'mahasiswa',
    label: 'Mahasiswa',
    ket: 'Mahasiswa S1 & S2 FSTI',
    ikon: GraduationCap,
    formId: '1FAIpQLSeTQFzGhGqFMDlKHL8qKzDuIrl04HTZWduzK60clBEK9y7Q7g',
  },
  {
    id: 'dosen',
    label: 'Dosen',
    ket: 'Dosen FSTI',
    ikon: Presentation,
    formId: '1FAIpQLSeFR7tN9RoOWGqz-E--tMcZKMv_iREVkzC9VINta2kkpaZS0Q',
  },
  {
    id: 'mitra-kp',
    label: 'Mitra · Kinerja Mahasiswa KP',
    ket: 'Instansi tempat mahasiswa kerja praktik',
    ikon: Handshake,
    formId: '1FAIpQLSeNngVVYpeDWgEarAmpB1qVf8-kfD-BLyS4k01WBh2TJeUCkg',
  },
  {
    id: 'mitra-pengguna',
    label: 'Mitra · Pengguna FSTI ITK',
    ket: 'Mitra dan pengguna lulusan',
    ikon: Building2,
    formId: '1FAIpQLScjIZsD5xG_-v9iinQY8vKVuCYFBencPTKftccY9Traqfm-iA',
  },
];

const SurveiView = () => {
  const [aktif, setAktif] = useState(SURVEI[0].id);
  const s = SURVEI.find((x) => x.id === aktif)!;
  const url = `https://docs.google.com/forms/d/e/${s.formId}/viewform`;

  return (
    <section className="wadah relative z-10 -mt-7 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div role="tablist" aria-label="Jenis responden" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {SURVEI.map(({ id, label, ket, ikon: Ikon }) => {
          const on = id === aktif;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={on}
              onClick={() => setAktif(id)}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left shadow-kartu transition-colors ${
                on ? 'border-primary-600 bg-primary-600 text-white' : 'border-garis bg-white hover:border-primary-300'
              }`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${on ? 'bg-white/15' : 'bg-primary-50 text-primary-600'}`}>
                <Ikon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-bold">{label}</span>
                <span className={`block text-xs ${on ? 'text-primary-100' : 'text-ink-3'}`}>{ket}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="kartu overflow-hidden" role="tabpanel">
        <div className="flex items-center justify-between gap-3 border-b border-garis px-5 py-3">
          <p className="text-sm font-bold">Survei {s.label}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
            <ExternalLink className="h-4 w-4" /> Buka di tab baru
          </a>
        </div>
        <iframe
          key={s.id}
          src={`${url}?embedded=true`}
          title={`Survei ${s.label}`}
          className="h-[75vh] min-h-[560px] w-full bg-white"
          loading="lazy"
          style={{ colorScheme: 'light' }}
        >
          Memuat…
        </iframe>
      </div>
    </section>
  );
};

export default SurveiView;
