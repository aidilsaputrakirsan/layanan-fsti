"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Search, FileText, Download, ExternalLink } from 'lucide-react';

// Daftar dokumen peraturan dan kebijakan
const documentsList = [
  {
    id: 'akademik',
    title: {
      id: 'Akademik',
      en: 'Academic',
    },
    description: {
      id: 'Panduan dan peraturan akademik untuk mahasiswa FSTI ITK',
      en: 'Academic guidelines and regulations for FSTI ITK students',
    },
    fileName: '9_PERATURAN_AKADEMIK.pdf',
    fileUrl: '/file/9_PERATURAN_AKADEMIK.pdf',
    thumbnailUrl: '/images/peraturan/akademik.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'kemahasiswaan',
    title: {
      id: 'Kemahasiswaan',
      en: 'Student Affairs',
    },
    description: {
      id: 'Panduan kegiatan, organisasi, dan peraturan kemahasiswaan',
      en: 'Guidelines for activities, organizations, and student regulations',
    },
    fileName: 'Peraturan Rektor-Kemahasiswaan.pdf',
    fileUrl: '/file/Peraturan Rektor-Kemahasiswaan.pdf',
    thumbnailUrl: '/images/peraturan/kemahasiswaan.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'tugasAkhir',
    title: {
      id: 'Tugas Akhir',
      en: 'Final Project',
    },
    description: {
      id: 'Panduan pelaksanaan dan penulisan Tugas Akhir mahasiswa',
      en: 'Guidelines for implementation and writing of student Final Projects',
    },
    fileName: 'PERATURAN-TA.pdf',
    fileUrl: '/file/PERATURAN-TA.pdf',
    thumbnailUrl: '/images/peraturan/tugas-akhir.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'magang',
    title: {
      id: 'Magang',
      en: 'Internship',
    },
    description: {
      id: 'Panduan pelaksanaan dan pelaporan kegiatan Magang',
      en: 'Guidelines for implementation and reporting of Internship activities',
    },
    fileName: 'PERATURAN-MAGANG.pdf',
    fileUrl: '/file/PERATURAN-MAGANG.pdf',
    thumbnailUrl: '/images/peraturan/magang.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'kerjaPraktik',
    title: {
      id: 'Kerja Praktik',
      en: 'Practical Work',
    },
    description: {
      id: 'Panduan pelaksanaan dan pelaporan kegiatan Kerja Praktik',
      en: 'Guidelines for implementation and reporting of Practical Work activities',
    },
    fileName: 'PERATURAN-KP.pdf',
    fileUrl: '/file/PERATURAN-KP.pdf',
    thumbnailUrl: '/images/peraturan/kerja-praktik.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'mbkm',
    title: {
      id: 'MBKM',
      en: 'MBKM',
    },
    description: {
      id: 'Panduan Merdeka Belajar Kampus Merdeka (MBKM) FSTI ITK',
      en: 'Independent Learning Campus (MBKM) guidelines for FSTI ITK',
    },
    fileName: 'Peraturan Rektor-MBKM.pdf',
    fileUrl: '/file/Peraturan Rektor-MBKM.pdf',
    thumbnailUrl: '/images/peraturan/mbkm.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'tataKehidupan',
    title: {
      id: 'Tata Kehidupan Kampus',
      en: 'Campus Life Code',
    },
    description: {
      id: 'Pedoman tata kehidupan dan etika di lingkungan kampus',
      en: 'Guidelines for campus life and ethics',
    },
    fileName: 'Peraturan Rektor-Tata Kehidupan.pdf',
    fileUrl: '/file/Peraturan Rektor-Tata Kehidupan.pdf',
    thumbnailUrl: '/images/peraturan/tata-kehidupan.png',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 'kalenderAkademik',
    title: {
      id: 'Kalender Akademik',
      en: 'Academic Calendar',
    },
    description: {
      id: 'Jadwal kegiatan akademik selama tahun ajaran',
      en: 'Schedule of academic activities throughout the academic year',
    },
    fileName: '726_KALENDER-AKADEMIK.pdf',
    fileUrl: '/file/726_KALENDER-AKADEMIK.pdf',
    thumbnailUrl: '/images/peraturan/kalender-akademik.png',
    icon: <FileText className="h-6 w-6" />,
  },
];

const PeraturanKebijakanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  
  // Filter dokumen berdasarkan pencarian
  const filteredDocuments = documentsList.filter(doc => {
    const searchLower = searchTerm.toLowerCase();
    return doc.title[language as 'id' | 'en'].toLowerCase().includes(searchLower) ||
           doc.description[language as 'id' | 'en'].toLowerCase().includes(searchLower);
  });

  return (
    <MainLayout>
      {/* Header Section dengan Animated Gradient Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
                {language === 'id' ? 'Peraturan, Kebijakan, dan Panduan Mahasiswa' : 'Regulations, Policies, and Student Guidelines'}
              </h1>
              <p className="text-gray-700 text-lg mb-10">
                {language === 'id' 
                  ? 'Dokumen-dokumen terkait aturan dan panduan untuk aktifitas mahasiswa di lingkungan FSTI' 
                  : 'Documents related to rules and guidelines for student activities within FSTI'}
              </p>
              
              {/* Search */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder={language === 'id' ? 'Cari dokumen...' : 'Search documents...'}
                    className="w-full bg-gray-50 text-gray-800 py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Dokumen Grid Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'id' ? 'Daftar Dokumen' : 'Document List'}
              {searchTerm && ` - ${language === 'id' ? 'Hasil pencarian untuk' : 'Search results for'} "${searchTerm}"`}
            </h2>
          </AnimatedSection>
          
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredDocuments.map((doc, index) => (
                <AnimatedSection 
                  key={doc.id} 
                  animation="slideUp" 
                  delay={index * 0.1}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover-card h-full flex flex-col">
                    {/* Thumbnail */}
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img 
                        src={doc.thumbnailUrl || `/images/peraturan/default.png`} 
                        alt={doc.title[language as 'id' | 'en']}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          // Fallback jika thumbnail tidak tersedia
                          (e.target as HTMLImageElement).src = "/images/peraturan/default.png";
                        }}
                      />
                    </div>
                    
                    {/* Konten */}
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {doc.title[language as 'id' | 'en']}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {doc.description[language as 'id' | 'en']}
                      </p>
                    </div>
                    
                    {/* Footer dengan tombol download */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">PDF</span>
                        <div className="flex space-x-2">
                          <a 
                            href={doc.fileUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                            title={language === 'id' ? 'Buka PDF' : 'Open PDF'}
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                          <a 
                            href={doc.fileUrl} 
                            download={doc.fileName}
                            className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                            title={language === 'id' ? 'Unduh PDF' : 'Download PDF'}
                          >
                            <Download className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fadeIn">
              <div className="text-center py-12">
                <div className="mb-6 text-gray-500">
                  <Search className="h-16 w-16 mx-auto opacity-30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'id' ? 'Tidak Ditemukan' : 'Not Found'}
                  </h3>
                  <p>
                    {language === 'id' 
                      ? 'Tidak ada dokumen yang sesuai dengan pencarian Anda.' 
                      : 'No documents match your search.'}
                  </p>
                </div>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {language === 'id' ? 'Reset Pencarian' : 'Reset Search'}
                </button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slideUp">
              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {language === 'id' ? 'Informasi Penting' : 'Important Information'}
                </h3>
                <div className="text-gray-700 space-y-4">
                  <p>
                    {language === 'id'
                      ? 'Dokumen-dokumen ini merupakan pedoman resmi yang ditetapkan oleh Institut Teknologi Kalimantan dan Fakultas Sains dan Teknologi Informasi. Mahasiswa diharapkan untuk membaca dan memahami dokumen-dokumen ini untuk kelancaran kegiatan akademik.'
                      : 'These documents are official guidelines established by Kalimantan Institute of Technology and the Faculty of Science and Information Technology. Students are expected to read and understand these documents for the smooth running of academic activities.'}
                  </p>
                  <p>
                    {language === 'id'
                      ? 'Seluruh dokumen dapat diunduh dan disimpan untuk referensi. Jika terdapat pertanyaan atau hal yang perlu diklarifikasi, silakan hubungi admin FSTI.'
                      : 'All documents can be downloaded and saved for reference. If there are questions or matters that need clarification, please contact the FSTI admin.'}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PeraturanKebijakanPage;