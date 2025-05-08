"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Import icons
import { 
  FileText, 
  Briefcase, 
  CheckCircle, 
  Award, 
  Users,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Folder,
  Edit,
  Search,
  FileSignature,
  Laptop,
  Database,
  PieChart,
  Heart,
  Globe,
  DollarSign,
  Bookmark,
  Calendar,
  FilePlus
} from 'lucide-react';

const LayananAdministrasiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { t, language } = useLanguage();

  // Data layanan mahasiswa - Could be moved to a separate file and use t() for translations
  const mahasiswaLayananList = [
    {
      id: "surat-umum",
      title: language === 'en' ? "Cover Letters / General Documents" : "Surat Pengantar / Dokumen Umum",
      description: language === 'en' 
        ? "Service for creating cover letters and general administrative documents for student needs."
        : "Layanan pembuatan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa.",
      icon: <FileText className="h-6 w-6" />,
      steps: language === 'en' 
        ? [
            "Fill out the letter of introduction application form",
            "Upload the required supporting documents",
            "Wait for verification by admin",
            "The letter will be processed and can be picked up or sent according to the provisions"
          ]
        : [
            "Isi formulir pengajuan surat pengantar",
            "Unggah dokumen pendukung yang diperlukan",
            "Tunggu proses verifikasi oleh admin",
            "Surat akan diproses dan dapat diambil atau dikirim sesuai ketentuan"
          ],
      requirements: language === 'en'
        ? [
            "Active student ID card",
            "Supporting documents as needed",
            "Have paid the current semester's tuition"
          ]
        : [
            "KTM aktif",
            "Dokumen pendukung sesuai keperluan",
            "Telah melunasi pembayaran UKT semester berjalan"
          ],
      estimatedTime: language === 'en' ? "2-3 working days" : "2-3 hari kerja",
      url: "https://forms.gle/TfydWAeGoFFQYdmR6",
      category: "mahasiswa"
    },
    {
      id: "kp-ta",
      title: language === 'en' ? "Internship / Apprenticeship and Final Projects" : "Kerja Praktek / Magang dan Tugas Akhir",
      description: language === 'en'
        ? "Administrative services related to the application and implementation of Internships, Apprenticeships, and Final Projects."
        : "Layanan administrasi terkait pengajuan dan pelaksanaan Kerja Praktek, Magang, dan Tugas Akhir.",
      icon: <Briefcase className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Practical Work" : "Kerja Praktik",
          items: [
            { text: language === 'en' ? "Registration Before Practical Work Acceptance" : "Pendaftaran Sebelum diterima Kerja Praktik", url: "https://forms.gle/XLPQbtTQatE4dgYN7" },
            { text: language === 'en' ? "Registration After Practical Work Acceptance" : "Pendaftaran Setelah diterima Kerja Praktik", url: "https://forms.gle/nQ85jfeA9L39NstL8" },
            { text: language === 'en' ? "Practical Work Seminar Registration" : "Pendaftaran Seminar Kerja Praktik", url: "https://forms.gle/KWrKUTqQG5uWbPQW6" },
            { text: language === 'en' ? "Upload Student Results Form" : "Upload Formulir Hasil Mahasiswa", url: "https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview" }
          ]
        },
        {
          title: language === 'en' ? "Internship" : "Magang",
          items: [
            { text: language === 'en' ? "Internship Introduction Registration" : "Pendaftaran Pengantar Magang", url: "https://docs.google.com/forms/d/e/1FAIpQLSevJWaWZJ7sBEqRtr2DQpPvQ2U8h7-Bo3LzZKB40Lt5-WZ6og/viewform" },
            { text: language === 'en' ? "Internship Results Seminar Registration" : "Pendaftaran Seminar Hasil Magang", url: "https://forms.gle/gWQLGqz3GXpYXJrXA" },
            { text: language === 'en' ? "Upload Student Results Form" : "Upload Formulir Hasil Mahasiswa", url: "https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview" }
          ]
        },
        {
          title: language === 'en' ? "Final Project" : "Tugas Akhir",
          items: [
            { text: language === 'en' ? "Final Project Proposal Seminar Registration" : "Pendaftaran Seminar Proposal Tugas Akhir (TA)", url: "https://forms.gle/Kprni4wLMBeEvhEx5" },
            { text: language === 'en' ? "Upload Student Results Form" : "Upload Formulir Hasil Mahasiswa", url: "https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview" },
            { text: language === 'en' ? "Final Project Defense Registration" : "Pendaftaran Sidang Tugas Akhir (TA)", url: "https://forms.gle/XtPfYYyuCJgPkgW68" },
            { text: language === 'en' ? "Collection of Final Project Document Receipt" : "Pengumpulan Bukti Tanda Terima Berkas Tugas Akhir", url: "https://docs.google.com/forms/d/e/1FAIpQLSe5apOobV_VL4CJKSG0HtMLFsclxktmt7sNl0hyRllxq-xfKw/viewform?usp=preview" }
          ]
        }
      ],
      steps: language === 'en'
        ? [
            "Choose the type of service needed (Internship/Apprenticeship/Final Project)",
            "Fill in the requested data on the form",
            "Upload supporting documents according to requirements",
            "Wait for verification and approval process",
            "Get documents/letters according to procedure"
          ]
        : [
            "Pilih jenis layanan yang dibutuhkan (KP/Magang/TA)",
            "Isi data yang diminta pada formulir",
            "Unggah dokumen pendukung sesuai persyaratan",
            "Tunggu proses verifikasi dan persetujuan",
            "Dapatkan dokumen/surat sesuai prosedur"
          ],
      requirements: language === 'en'
        ? [
            "Have completed at least 100 credits (for Internship/Apprenticeship)",
            "Have completed at least 120 credits (for Final Project)",
            "Active student ID card",
            "Latest transcript",
            "Have paid the current semester's tuition"
          ]
        : [
            "Telah menempuh minimal 100 SKS (untuk KP/Magang)",
            "Telah menempuh minimal 120 SKS (untuk TA)",
            "KTM aktif",
            "Transkrip nilai terbaru",
            "Telah melunasi pembayaran UKT semester berjalan"
          ],
      estimatedTime: language === 'en' ? "3-5 working days" : "3-5 hari kerja",
      category: "mahasiswa"
    },
    {
      id: "legalisasi",
      title: language === 'en' ? "Document Legalization" : "Legalisasi Dokumen",
      description: language === 'en' 
        ? "Legalization service for official faculty academic documents such as transcripts, diplomas, and certificates."
        : "Layanan legalisasi untuk dokumen akademik resmi fakultas seperti transkrip, ijazah, dan sertifikat.",
      icon: <CheckCircle className="h-6 w-6" />,
      steps: language === 'en'
        ? [
            "Fill out the legalization application form",
            "Upload the document to be legalized",
            "Pay the legalization fee according to the provisions",
            "Wait for the legalization process",
            "Collect the legalized document"
          ]
        : [
            "Isi formulir pengajuan legalisasi",
            "Unggah dokumen yang akan dilegalisir",
            "Bayar biaya legalisasi sesuai ketentuan",
            "Tunggu proses legalisasi",
            "Ambil dokumen yang telah dilegalisir"
          ],
      requirements: language === 'en'
        ? [
            "ID Card/Student ID",
            "Original document to be legalized",
            "Photocopy of the document to be legalized",
            "Proof of legalization fee payment"
          ]
        : [
            "KTP/KTM",
            "Dokumen asli yang akan dilegalisir",
            "Fotokopi dokumen yang akan dilegalisir",
            "Bukti pembayaran biaya legalisasi"
          ],
      estimatedTime: language === 'en' ? "1-2 working days" : "1-2 hari kerja",
      url: "https://forms.gle/Z7FiBx4B2zMRuUGQ7",
      category: "mahasiswa"
    },
    // ... more services can be added here
  ];

  // Data layanan dosen
  const dosenLayananList = [
    {
      id: "siakad",
      title: language === 'en' ? "SIAKAD (Academic Information System)" : "SIAKAD (Sistem Informasi Akademik)",
      description: language === 'en'
        ? "Information system for managing academic data, student grades, and other academic activities."
        : "Sistem informasi untuk pengelolaan data akademik, nilai mahasiswa, dan aktivitas akademik lainnya.",
      icon: <Database className="h-6 w-6" />,
      steps: language === 'en' 
        ? [
            "Access the SIAKAD portal",
            "Login using lecturer credentials",
            "Navigate to the required menu",
            "Process academic data"
          ]
        : [
            "Akses portal SIAKAD",
            "Login menggunakan kredensial dosen",
            "Navigasi ke menu yang diperlukan",
            "Lakukan pengolahan data akademik"
          ],
      requirements: language === 'en'
        ? [
            "Active lecturer account",
            "Connected to the internet",
            "Latest browser version"
          ]
        : [
            "Akun dosen aktif",
            "Terhubung ke jaringan internet",
            "Browser versi terbaru"
          ],
      estimatedTime: language === 'en' ? "Direct access" : "Akses langsung",
      url: "http://gerbang.itk.ac.id/",
      category: "dosen"
    },
    // ... more lecturer services can be added here
  ];

  // Gabungkan semua layanan
  const layananList = [...mahasiswaLayananList, ...dosenLayananList];

  // Filter layanan berdasarkan pencarian
  const filteredServices = layananList.filter(layanan => {
    const matchesSearch = layanan.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          layanan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && layanan.category === filter;
  });

  return (
    <MainLayout>
      {/* Header Section with Animated Gradient Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">{t('services.title')}</h1>
              <p className="text-gray-700 text-lg mb-10">
                {t('services.description')}
              </p>
              
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder={t('services.search')}
                      className="w-full bg-gray-50 text-gray-800 py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        filter === 'all' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setFilter('all')}
                    >
                      {t('services.all')}
                    </button>
                    <button
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        filter === 'mahasiswa' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setFilter('mahasiswa')}
                    >
                      {t('services.students')}
                    </button>
                    <button
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        filter === 'dosen' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setFilter('dosen')}
                    >
                      {t('services.lecturers')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Daftar Layanan Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {t('services.servicesList')}
              {filter !== 'all' && ` ${filter === 'mahasiswa' ? t('services.students') : t('services.lecturers')}`}
              {searchTerm && ` - ${t('services.searchResultsFor')} "${searchTerm}"`}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            {filteredServices.length > 0 ? (
              filteredServices.map((layanan, index) => (
                <AnimatedSection 
                  key={layanan.id} 
                  animation="slideUp" 
                  delay={index * 0.1}
                >
                  <div id={layanan.id} className={`bg-white rounded-xl shadow-md overflow-hidden hover-card mb-10 ${
                    layanan.category === 'mahasiswa' ? 'border-l-4 border-primary-600' : 'border-l-4 border-accent'
                  }`}>
                    <div className={`p-5 flex items-center ${
                      layanan.category === 'mahasiswa' ? 'bg-gradient-to-r from-primary-50 to-white' : 'bg-gradient-to-r from-accent/10 to-white'
                    }`}>
                      <div className={`mr-4 service-icon text-2xl ${
                        layanan.category === 'mahasiswa' ? 'text-primary-600' : 'text-accent'
                      }`}>
                        {layanan.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold text-gray-800">{layanan.title}</h3>
                          <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                            layanan.category === 'mahasiswa' 
                              ? 'bg-primary-50 text-primary-600' 
                              : 'bg-accent/10 text-accent'
                          }`}>
                            {layanan.category === 'mahasiswa' ? t('services.students') : t('services.lecturers')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-6">{layanan.description}</p>
                      
                      {/* Sub-layanan jika ada */}
                      {layanan.hasOwnProperty('subLayanan') && 'subLayanan' in layanan && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-gray-800">Related Links</h4>
                          <div className="space-y-4">
                            {(layanan as any).subLayanan.map((sub: { title: string; items: any[] }, idx: number) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <h5 className={`font-medium mb-2 ${
                                  layanan.category === 'mahasiswa' ? 'text-primary-600' : 'text-accent'
                                }`}>
                                  {sub.title}
                                </h5>
                                <ul className="space-y-2">
                                  {sub.items.map((item: { text: string; url: string }, itemIdx: number) => (
                                    <li key={itemIdx} className="flex items-center">
                                      <ArrowRight className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                                      <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-gray-700 hover:underline truncate"
                                      >
                                        {item.text}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {layanan.requirements && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('services.requirements')}</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                              {layanan.requirements.map((req, index) => (
                                <li key={index} className="pl-2">
                                  <span className={`${
                                    layanan.category === 'mahasiswa' ? 'text-primary-600' : 'text-accent'
                                  }`}>•</span> 
                                  <span className="ml-2">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {layanan.steps && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('services.steps')}</h4>
                            <ol className="text-gray-700 space-y-2">
                              {layanan.steps.map((step, index) => (
                                <li key={index} className="flex">
                                  <span className={`font-bold mr-2 ${
                                    layanan.category === 'mahasiswa' ? 'text-primary-600' : 'text-accent'
                                  }`}>{index + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-5 rounded-xl">
                        <div className="mb-4 sm:mb-0">
                          <span className="block text-sm text-gray-500">{t('services.estimatedTime')}</span>
                          <span className="font-medium text-gray-800">{layanan.estimatedTime}</span>
                        </div>
                        {layanan.url && (
                          <a 
                            href={layanan.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white text-center flex items-center justify-center group ${
                              layanan.category === 'mahasiswa' 
                                ? 'bg-primary-600 hover:bg-primary-700' 
                                : 'bg-accent hover:bg-accent/80'
                            }`}
                          >
                            <span>{t('common.accessService')}</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              <AnimatedSection animation="fadeIn">
                <div className="text-center py-12">
                  <div className="mb-6 text-gray-500">
                    <Search className="h-16 w-16 mx-auto opacity-30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t('services.notFound')}</h3>
                    <p>{t('services.noServicesMatch')}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                    }}
                    variant="outline"
                  >
                    {t('services.resetSearch')}
                  </Button>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Alur Kerja Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-6 text-gradient">{t('services.workflow.title')}</h2>
            <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Below is the service request workflow for FSTI services from submission to completion, including status checking mechanism and improvement process if needed.'
                : 'Berikut adalah alur proses permohonan layanan FSTI dari tahap pengajuan hingga penyelesaian, termasuk mekanisme pengecekan status dan perbaikan jika diperlukan.'}
            </p>
          </AnimatedSection>
          
          {/* Alur Kerja Diagram */}
          <AnimatedSection animation="fadeIn" delay={0.3} className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover-card max-w-5xl mx-auto">
              <div className="overflow-auto">
                <img 
                  src="/images/alur-kerja-fsti.png" 
                  alt={language === 'en' ? 'FSTI Service Workflow' : 'Alur Kerja Layanan FSTI'} 
                  className="w-full h-auto object-contain" 
                />
              </div>
              <div className="mt-4 px-2">
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'The workflow diagram shows the service process from both Applicant (top) and Staff (bottom) perspective. Applicants can check service status and make improvements if needed.'
                    : 'Diagram alur kerja menunjukkan proses layanan dari perspektif Pemohon (atas) dan Tendik (bawah). Pemohon dapat memeriksa status layanan dan melakukan perbaikan jika diperlukan.'}
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Ringkasan Tahapan */}
          <div className="mt-10">
            <AnimatedSection animation="slideUp">
              <h3 className="text-2xl font-display font-semibold text-center mb-8 text-gradient">
                {language === 'en' ? 'Service Request Steps Summary' : 'Ringkasan Tahapan Layanan'}
              </h3>
            </AnimatedSection>
            
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center">
                {/* Step 1 */}
                <AnimatedSection 
                  className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                  animation="slideUp" 
                  delay={0.1}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mb-4 shadow-md">1</div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">{t('services.workflow.steps.submission')}</h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' ? 'Select service and fill the required form' : 'Pilih layanan dan isi formulir yang diperlukan'}
                    </p>
                  </div>
                </AnimatedSection>
                
                {/* Step 2 */}
                <AnimatedSection 
                  className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                  animation="slideUp" 
                  delay={0.2}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mb-4 shadow-md">2</div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">{t('services.workflow.steps.verification')}</h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' ? 'Document verification by admin staff' : 'Verifikasi dokumen oleh staf admin'}
                    </p>
                  </div>
                </AnimatedSection>
                
                {/* Step 3 */}
                <AnimatedSection 
                  className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                  animation="slideUp" 
                  delay={0.3}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mb-4 shadow-md">3</div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">{t('services.workflow.steps.processing')}</h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' ? 'Request processing within 24 hours' : 'Pemrosesan permohonan dalam 24 jam kerja'}
                    </p>
                  </div>
                </AnimatedSection>
                
                {/* Step 4 */}
                <AnimatedSection 
                  className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                  animation="slideUp" 
                  delay={0.4}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mb-4 shadow-md">4</div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">{t('services.workflow.steps.approval')}</h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' ? 'Check results via email' : 'Cek hasil melalui email'}
                    </p>
                  </div>
                </AnimatedSection>
                
                {/* Step 5 */}
                <AnimatedSection 
                  className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                  animation="slideUp" 
                  delay={0.5}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mb-4 shadow-md">5</div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">{t('services.workflow.steps.distribution')}</h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' ? 'Make improvements via WA/Email if needed' : 'Lakukan perbaikan via WA/Email jika diperlukan'}
                    </p>
                  </div>
                </AnimatedSection>
                
                {/* Step 6 */}
                <AnimatedSection 
                  className="w-full md:w-1/3 lg:w-1/6 px-4" 
                  animation="slideUp" 
                  delay={0.6}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mb-4 shadow-md">6</div>
                    <h3 className="font-semibold mb-2 text-gray-800 text-lg">{t('services.workflow.steps.archiving')}</h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' ? 'Request completed' : 'Permohonan terselesaikan'}
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
          
          {/* Petunjuk Tambahan */}
          <AnimatedSection animation="fadeIn" delay={0.7} className="mt-12">
            <div className="bg-gray-50 rounded-xl p-6 max-w-3xl mx-auto">
              <h4 className="font-semibold text-lg mb-3 text-center text-gray-800">
                {language === 'en' ? 'Additional Information' : 'Informasi Tambahan'}
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  {language === 'en' 
                    ? 'For document status inquiries, you can contact FSTI admin via WhatsApp Business within 24 hours after submission'
                    : 'Untuk menanyakan status dokumen, Anda dapat menghubungi admin FSTI melalui WhatsApp Business dalam waktu 24 jam setelah pengajuan'}
                </li>
                <li>
                  {language === 'en' 
                    ? 'If revisions are needed, you will be notified via email or WhatsApp Business'
                    : 'Jika diperlukan revisi, Anda akan diberitahu melalui email atau WhatsApp Business'}
                </li>
                <li>
                  {language === 'en' 
                    ? 'Please ensure all required documents are complete to avoid processing delays'
                    : 'Pastikan semua dokumen yang diperlukan lengkap untuk menghindari keterlambatan pemrosesan'}
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-light-bg to-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-2xl font-display font-bold mb-6 text-gray-800">{t('services.needHelp.title')}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('services.needHelp.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                href="mailto:fsti@itk.ac.id" 
                variant="primary"
                icon={<svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>}
                animate
              >
                {t('common.email')}
              </Button>
              <Button 
                href="#kontak" 
                variant="outline"
                icon={<svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>}
                animate
              >
                {t('common.contact')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default LayananAdministrasiPage;