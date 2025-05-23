"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Search, Download, ExternalLink } from 'lucide-react';

// Daftar dokumen peraturan dan kebijakan
const documentsList = [
  {
    id: 'akademik',
    title: {
      id: 'Akademik',
      en: 'Academic',
    },
    description: {
      id: 'Panduan dan peraturan akademik untuk mahasiswa FSTI ITK (Peraturan Nomor 4 Tahun 2025 dan Peraturan Nomor 9 Tahun 2024)',
      en: 'Academic guidelines and regulations for FSTI ITK students (Regulation Number 4 of 2025 and Regulation Number 9 of 2024)',
    },
    fileName: '9_PERATURAN_AKADEMIK.pdf',
    fileUrl: '/file/Peraturan Akademik Nomor 4 dan Nomor 9.pdf',
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
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-center flex-wrap gap-8">
                {filteredDocuments.map((doc, index) => (
                  <AnimatedSection
                    key={doc.id}
                    animation="slideUp"
                    delay={index * 0.1}
                    className="w-full max-w-md"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Badge for Importance */}
                      <div className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-tr-lg absolute top-0 right-0 m-2">
                        {language === 'id' ? 'Dokumen Penting' : 'Important Document'}
                      </div>

                      {/* Preview Frame */}
                      <div className="relative h-48 flex items-center justify-center p-6 border-b border-gray-200 overflow-hidden">
                        {/* 1. Gradient background */}
                        <span
                          className="
                            absolute inset-0
                            bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50
                            animate-pulse
                            z-0
                          "
                        />

                        {/* 2. Dots yang lebih besar dan jelas (z-10) */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                          {[
                            { top: '15%', left: '20%', delay: '0s' },
                            { top: '70%', left: '30%', delay: '0.5s' },
                            { top: '40%', left: '75%', delay: '1s' },
                            { top: '60%', left: '60%', delay: '1.5s' },
                            { top: '30%', left: '50%', delay: '2s' },
                          ].map((dot, i) => (
                            <span
                              key={i}
                              className="
                                absolute
                                bg-blue-300
                                rounded-full
                                opacity-75
                                animate-ping
                              "
                              style={{
                                width: '12px',
                                height: '12px',
                                top: dot.top,
                                left: dot.left,
                                animationDelay: dot.delay,
                                animationDuration: '2s',
                              }}
                            />
                          ))}
                        </div>

                        {/* 3. Card PDF (z-20) */}
                        <div className="
                          relative bg-white rounded-lg shadow-sm p-2 w-32
                          transform rotate-3 hover:rotate-0 transition-transform duration-300
                          z-20
                        ">
                          <img
                            src="/images/pdf-icon.png"
                            alt="PDF Template"
                            className="w-full h-auto"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://cdn-icons-png.flaticon.com/512/337/337946.png";
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-primary-600 transition-colors">
                          {doc.title[language as 'id' | 'en']}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {doc.description[language as 'id' | 'en']}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="ml-auto flex space-x-2">
                            <a 
                              href={doc.fileUrl} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 flex items-center"
                            >
                              <ExternalLink className="h-5 w-5 mr-1" />
                              <span className="text-sm font-medium">
                                {language === 'id' ? 'Lihat' : 'View'}
                              </span>
                            </a>
                            <a 
                              href={doc.fileUrl} 
                              download={doc.fileName}
                              className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 flex items-center"
                            >
                              <Download className="h-5 w-5 mr-1" />
                              <span className="text-sm font-medium">
                                {language === 'id' ? 'Unduh' : 'Download'}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
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