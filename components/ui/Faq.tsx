import { ChevronDown } from 'lucide-react';

/** Daftar tanya-jawab dengan <details> bawaan (tanpa JavaScript). */
const Faq = ({ item }: { item: { t: string; j: string }[] }) => (
  <div className="kartu divide-y divide-garis overflow-hidden">
    {item.map((f) => (
      <details key={f.t} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink hover:bg-latar/60 [&::-webkit-details-marker]:hidden">
          {f.t}
          <ChevronDown className="h-5 w-5 shrink-0 text-ink-3 transition-transform group-open:rotate-180" />
        </summary>
        <p className="px-5 pb-5 text-sm leading-relaxed text-ink-2">{f.j}</p>
      </details>
    ))}
  </div>
);

export default Faq;
