"use client";

import { useState } from 'react';
import { Play, Clock3 } from 'lucide-react';
import type { Video } from '@/data/panduan';

/** Kartu video YouTube; iframe baru dimuat saat diklik. Tanpa youtubeId tampil "Segera hadir". */
const VideoKartu = ({ v, no }: { v: Video; no: number }) => {
  const [putar, setPutar] = useState(false);

  return (
    <article className="kartu overflow-hidden">
      <div className="relative aspect-video bg-primary-900">
        {v.youtubeId ? (
          putar ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
              title={v.judul}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button type="button" onClick={() => setPutar(true)} className="group absolute inset-0" aria-label={`Putar video ${v.judul}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" loading="lazy" />
              <span className="absolute inset-0 flex items-center justify-center bg-primary-950/30 transition-colors group-hover:bg-primary-950/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sorot-400 text-ink shadow-angkat">
                  <Play className="ml-1 h-6 w-6" fill="currentColor" />
                </span>
              </span>
            </button>
          )
        ) : (
          <div className="pola-titik absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-extrabold text-white/15">{String(no).padStart(2, '0')}</span>
            <span className="mt-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-100">
              Segera hadir
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold leading-snug">{v.judul}</h3>
        <p className="mt-1 text-sm text-ink-2">{v.ringkas}</p>
        {v.durasi && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-3">
            <Clock3 className="h-3.5 w-3.5" /> {v.durasi}
          </p>
        )}
      </div>
    </article>
  );
};

export default VideoKartu;
