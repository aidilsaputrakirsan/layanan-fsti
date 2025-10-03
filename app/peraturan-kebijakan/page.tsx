"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Search, Download, ExternalLink, FileText } from 'lucide-react';

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
    fileName: 'PERATURAN-AKADEMIK.pdf',
    fileUrl: '/file/PERATURAN-AKADEMIK.pdf',
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
    fileName: 'KEMAHASISWAAN.pdf',
    fileUrl: '/file/KEMAHASISWAAN.pdf',
  },
  {
    id: 'biayaPendidikan',
    title: {
      id: 'Biaya Pendidikan Mahasiswa',
      en: 'Student Tuition Fees',
    },
    description: {
      id: 'Informasi lengkap mengenai biaya pendidikan, UKT, dan komponen biaya lainnya untuk mahasiswa ITK',
      en: 'Complete information about tuition fees, UKT, and other fee components for ITK students',
    },
    fileName: 'BIAYA-PENDIDIKAN.pdf',
    fileUrl: '/file/BIAYA-PENDIDIKAN.pdf',
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
    fileName: 'TUGAS-AKHIR.pdf',
    fileUrl: '/file/TUGAS-AKHIR.pdf',
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
    fileName: 'MAGANG.pdf',
    fileUrl: '/file/MAGANG.pdf',
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
    fileName: 'KERJA-PRAKTIK.pdf',
    fileUrl: '/file/KERJA-PRAKTIK.pdf',
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
    fileName: 'MBKM.pdf',
    fileUrl: '/file/MBKM.pdf',
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
    fileName: 'TATA-KEHIDUPAN.pdf',
    fileUrl: '/file/TATA-KEHIDUPAN.pdf',
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
    fileName: 'KALENDER-AKADEMIK.pdf',
    fileUrl: '/file/KALENDER-AKADEMIK.pdf',
  },
  // ============= 8 FILE BARU =============
  {
    id: 'pembelajaranDiluarProdi',
    title: {
      id: 'Pembelajaran di Luar Program Studi',
      en: 'Learning Outside Study Program',
    },
    description: {
      id: 'Panduan pembelajaran di luar program studi untuk memperluas wawasan dan kompetensi mahasiswa',
      en: 'Guidelines for learning outside the study program to broaden student insights and competencies',
    },
    fileName: 'PEMBELAJARAN-DILUAR-PRODI.pdf',
    fileUrl: '/file/PEMBELAJARAN-DILUAR-PRODI.pdf',
  },
  {
    id: 'magangRiset',
    title: {
      id: 'Magang Riset',
      en: 'Research Internship',
    },
    description: {
      id: 'Panduan pelaksanaan magang riset untuk mahasiswa yang ingin mengembangkan kemampuan penelitian',
      en: 'Guidelines for research internships for students who want to develop research skills',
    },
    fileName: 'MAGANG-RISET.pdf',
    fileUrl: '/file/MAGANG-RISET.pdf',
  },
  {
    id: 'kknTematik',
    title: {
      id: 'Kuliah Kerja Nyata Tematik',
      en: 'Thematic Community Service',
    },
    description: {
      id: 'Panduan pelaksanaan KKN Tematik sebagai bentuk pengabdian kepada masyarakat',
      en: 'Guidelines for implementing Thematic Community Service as a form of service to the community',
    },
    fileName: 'KKN-TEMATIK.pdf',
    fileUrl: '/file/KKN-TEMATIK.pdf',
  },
  {
    id: 'pertukaranMahasiswa',
    title: {
      id: 'Pertukaran Mahasiswa',
      en: 'Student Exchange',
    },
    description: {
      id: 'Panduan program pertukaran mahasiswa untuk pengalaman belajar di institusi lain',
      en: 'Guidelines for student exchange programs for learning experiences at other institutions',
    },
    fileName: 'PERTUKARAN-MAHASISWA.pdf',
    fileUrl: '/file/PERTUKARAN-MAHASISWA.pdf',
  },
  {
    id: 'kewirausahaan',
    title: {
      id: 'Kewirausahaan',
      en: 'Entrepreneurship',
    },
    description: {
      id: 'Panduan kegiatan kewirausahaan untuk mengembangkan jiwa entrepreneur mahasiswa',
      en: 'Entrepreneurship guidelines to develop student entrepreneurial spirit',
    },
    fileName: 'KEWIRAUSAHAAN.pdf',
    fileUrl: '/file/KEWIRAUSAHAAN.pdf',
  },
  {
    id: 'magangKeprofesian',
    title: {
      id: 'Magang Keprofesian',
      en: 'Professional Internship',
    },
    description: {
      id: 'Panduan magang keprofesian untuk pengalaman kerja di bidang profesi tertentu',
      en: 'Professional internship guidelines for work experience in specific professional fields',
    },
    fileName: 'MAGANG-KEPROFESIAN.pdf',
    fileUrl: '/file/MAGANG-KEPROFESIAN.pdf',
  },
  {
    id: 'proyekKemanusiaan',
    title: {
      id: 'Proyek Kemanusiaan',
      en: 'Humanitarian Project',
    },
    description: {
      id: 'Panduan proyek kemanusiaan untuk berkontribusi dalam isu-isu sosial dan kemanusiaan',
      en: 'Humanitarian project guidelines to contribute to social and humanitarian issues',
    },
    fileName: 'PROYEK-KEMANUSIAAN.pdf',
    fileUrl: '/file/PROYEK-KEMANUSIAAN.pdf',
  },
  {
    id: 'studiProyekIndependen',
    title: {
      id: 'Studi Proyek Independen',
      en: 'Independent Project Study',
    },
    description: {
      id: 'Panduan studi proyek independen untuk mengembangkan proyek secara mandiri',
      en: 'Independent project study guidelines to develop projects independently',
    },
    fileName: 'STUDI-PROYEK-INDEPENDEN.pdf',
    fileUrl: '/file/STUDI-PROYEK-INDEPENDEN.pdf',
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
                {searchTerm && (
                  <div className="mt-3 text-sm text-gray-600">
                    {filteredDocuments.length} {language === 'id' ? 'dokumen ditemukan' : 'documents found'}
                  </div>
                )}
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
            </h2>
          </AnimatedSection>

          {filteredDocuments.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc, index) => (
                  <AnimatedSection
                    key={doc.id}
                    animation="slideUp"
                    delay={index * 0.05}
                  >
                    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 hover:border-primary-300">
                     
                      {/* Preview Header dengan Gradient */}
                      <div className="relative h-40 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 flex items-center justify-center overflow-hidden">
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        
                        {/* Animated dots background */}
                        <div className="absolute inset-0 pointer-events-none opacity-30">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="absolute bg-white rounded-full animate-ping"
                              style={{
                                width: '8px',
                                height: '8px',
                                top: `${20 + i * 15}%`,
                                left: `${15 + i * 20}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: '3s',
                              }}
                            />
                          ))}
                        </div>

                        {/* PDF Icon Card */}
                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                          <div className="bg-white rounded-xl shadow-lg p-4">
                            <FileText className="h-12 w-12 text-primary-600" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {doc.title[language as 'id' | 'en']}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {doc.description[language as 'id' | 'en']}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex gap-2">
                          <a 
                            href={doc.fileUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-all font-medium"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm">
                              {language === 'id' ? 'Lihat' : 'View'}
                            </span>
                          </a>
                          <a 
                            href={doc.fileUrl} 
                            download={doc.fileName}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all font-medium shadow-md hover:shadow-lg"
                          >
                            <Download className="h-4 w-4" />
                            <span className="text-sm">
                              {language === 'id' ? 'Unduh' : 'Download'}
                            </span>
                          </a>
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
              <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-8 shadow-md border border-primary-100">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {language === 'id' ? '💡 Informasi Penting' : '💡 Important Information'}
                </h3>
                <div className="text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    {language === 'id'
                      ? 'Dokumen-dokumen ini merupakan pedoman resmi yang ditetapkan oleh Institut Teknologi Kalimantan dan Fakultas Sains dan Teknologi Informasi. Mahasiswa diharapkan untuk membaca dan memahami dokumen-dokumen ini untuk kelancaran kegiatan akademik.'
                      : 'These documents are official guidelines established by Kalimantan Institute of Technology and the Faculty of Science and Information Technology. Students are expected to read and understand these documents for the smooth running of academic activities.'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'id'
                      ? '📥 Seluruh dokumen dapat diunduh dan disimpan untuk referensi. Jika terdapat pertanyaan atau hal yang perlu diklarifikasi, silakan hubungi admin FSTI.'
                      : '📥 All documents can be downloaded and saved for reference. If there are questions or matters that need clarification, please contact the FSTI admin.'}
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