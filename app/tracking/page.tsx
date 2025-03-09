"use client";

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  HelpCircle 
} from 'lucide-react';

const TrackingSelectionPage = () => {
  return (
    <MainLayout>
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="slideUp">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">Tracking Dokumen</h1>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-6">
              Lacak status dokumen administrasi FSTI. Silakan pilih kategori pengguna Anda untuk melacak dokumen yang relevan.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Selection Cards Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="bg-dark-card rounded-xl shadow-lg p-8 border border-dark-border hover:border-fsti-light transition-all duration-300 h-full">
                <div className="flex flex-col h-full">
                  <div className="rounded-full bg-fsti-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <Briefcase className="w-8 h-8 text-fsti-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Dosen & Tenaga Kependidikan</h2>
                  <p className="text-gray-300 mb-6 flex-grow">
                    Lacak dokumen-dokumen Anda seperti Surat Tugas, Pengesahan TTD Dekanat, dan Peminjaman Sarana Prasarana.
                  </p>
                  <div className="mt-auto">
                    <Link href="/tracking/dosen">
                      <Button fullWidth className="flex items-center justify-center group">
                        Tracking Dokumen Dosen
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="bg-dark-card rounded-xl shadow-lg p-8 border border-dark-border hover:border-fsti-light transition-all duration-300 h-full">
                <div className="flex flex-col h-full">
                  <div className="rounded-full bg-fsti-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <GraduationCap className="w-8 h-8 text-fsti-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Mahasiswa</h2>
                  <p className="text-gray-300 mb-6 flex-grow">
                    Lacak dokumen-dokumen mahasiswa seperti Surat Keterangan Aktif, Surat Izin Penelitian, Transkrip, dan lainnya.
                  </p>
                  <div className="mt-auto">
                    <Link href="/tracking/mahasiswa">
                      <Button fullWidth className="flex items-center justify-center group">
                        Tracking Dokumen Mahasiswa
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">Pertanyaan Umum</h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="bg-dark-card rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-fsti-light group-hover:text-white transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Apa itu Sistem Tracking Dokumen?</h3>
                    <p className="text-gray-300">
                      Sistem Tracking Dokumen adalah layanan digital FSTI ITK yang memungkinkan Anda melacak status dokumen yang sedang diproses. 
                      Dengan sistem ini, Anda dapat mengetahui posisi dokumen Anda dalam alur pemrosesan secara real-time.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="bg-dark-card rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-fsti-light group-hover:text-white transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Bagaimana cara menggunakan sistem ini?</h3>
                    <p className="text-gray-300">
                      Pilih jenis pengguna (Dosen/Tendik atau Mahasiswa), kemudian masukkan nama atau NIP/NIM Anda pada form pencarian. 
                      Sistem akan menampilkan semua dokumen terkait dengan data yang Anda masukkan.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.3}>
              <div className="bg-dark-card rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-fsti-light group-hover:text-white transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Berapa lama proses pengajuan dokumen?</h3>
                    <p className="text-gray-300">
                      Waktu pemrosesan bervariasi tergantung jenis dokumen. Umumnya berkisar antara 1-5 hari kerja. 
                      Detail waktu pemrosesan untuk setiap jenis dokumen dapat dilihat pada halaman Layanan Administrasi.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.4}>
              <div className="bg-dark-card rounded-xl shadow-md p-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-fsti-light group-hover:text-white transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Apa yang harus dilakukan jika status dokumen tidak berubah?</h3>
                    <p className="text-gray-300">
                      Jika status dokumen Anda tidak berubah selama lebih dari 3 hari kerja, silakan hubungi kami melalui 
                      email fsti@itk.ac.id atau datang langsung ke kantor Administrasi FSTI.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TrackingSelectionPage;