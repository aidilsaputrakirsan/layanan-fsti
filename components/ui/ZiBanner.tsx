"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const banner = [
  {
    src: '/images/zi.png',
    alt: 'Anda memasuki Zona Integritas — mahasiswa dilarang memberi hadiah/bingkisan kepada Dosen, Tendik, Pembimbing, Penguji, dan Manajemen Program Studi',
  },
  {
    src: '/images/zi2.png',
    alt: 'Semua layanan kami gratis — laporkan ke fsti@itk.ac.id jika ada pungutan',
  },
];

/** Carousel banner Zona Integritas. */
const ZiBanner = () => {
  const [i, setI] = useState(0);
  const [jeda, setJeda] = useState(false);

  useEffect(() => {
    if (jeda) return;
    const t = setInterval(() => setI((p) => (p + 1) % banner.length), 6000);
    return () => clearInterval(t);
  }, [jeda]);

  return (
    <div onMouseEnter={() => setJeda(true)} onMouseLeave={() => setJeda(false)}>
      <div className="relative aspect-[755/423] w-full overflow-hidden rounded-2xl border border-garis bg-white shadow-kartu">
        {banner.map((b, idx) => (
          <Image
            key={b.src}
            src={b.src}
            alt={b.alt}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className={`object-contain transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={idx !== i}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {banner.map((b, idx) => (
          <button
            key={b.src}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Tampilkan banner ${idx + 1}`}
            aria-current={idx === i}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-primary-600' : 'w-2 bg-garis hover:bg-ink-3'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ZiBanner;
