import {
  Award,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  FileSignature,
  FolderClosed,
  Globe,
  Mail,
  MonitorCog,
  PenLine,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

import type { IkonNama, Tujuan } from '@/lib/data/layanan';

/** Satu keluarga ikon, satu ketebalan garis. Tidak ada emoji sebagai ikon. */
export const IKON_LAYANAN: Record<IkonNama, LucideIcon> = {
  surat: Mail,
  kerja: BriefcaseBusiness,
  akademik: BookOpen,
  verifikasi: ShieldCheck,
  ubah: PenLine,
  kemahasiswaan: Users,
  keuangan: Banknote,
  humas: Globe,
  sistem: MonitorCog,
  tandatangan: FileSignature,
  folder: FolderClosed,
  penghargaan: Award,
};

/** Label tujuan — mengatakan apa adanya ke mana sebuah tautan membawa. */
export const LABEL_TUJUAN: Record<Tujuan, { id: string; en: string }> = {
  form: { id: 'Google Form', en: 'Google Form' },
  dokumen: { id: 'Google Docs', en: 'Google Docs' },
  lembar: { id: 'Google Sheets', en: 'Google Sheets' },
  folder: { id: 'Google Drive', en: 'Google Drive' },
  sistem: { id: 'Sistem ITK', en: 'ITK System' },
};
