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
  FilePlus,
  Download,
  ExternalLink
} from 'lucide-react';

const LayananAdministrasiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { t, language } = useLanguage();

  // Data layanan mahasiswa
  const mahasiswaLayananList = [
    {
      id: "surat",
      title: language === 'en' ? "Letter Services" : "Layanan Surat",
      description: language === 'en' 
        ? "Service for creating cover letters and general administrative documents for student needs."
        : "Layanan pembuatan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa.",
      icon: <FileText className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Cover Letter Services" : "Layanan Surat Pengantar",
          items: [
            { text: language === 'en' ? "Cover Letter Request" : "Permohonan Surat Pengantar", url: "https://forms.gle/TfydWAeGoFFQYdmR6" },
            { text: language === 'en' ? "Recommendation Letter Request for Activities/Scholarships/Other" : "Permohonan Surat Rekomendasi Kegiatan/Beasiswa/Kegiatan lainnya", url: "https://docs.google.com/forms/d/1nTZZM4hKMTcFOenFbIOUBrnCyaRLqzlifiDx6QAZEO0/viewform?edit_requested=true" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
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
            { text: language === 'en' ? "Final Project Results Seminar Registration" : "Pendaftaran Seminar Hasil Tugas Akhir", url: "#" },
            { text: language === 'en' ? "Final Project Defense Registration" : "Pendaftaran Sidang Tugas Akhir (TA)", url: "https://forms.gle/XtPfYYyuCJgPkgW68" },
            { text: language === 'en' ? "Collection of Final Project Document Receipt" : "Pengumpulan Bukti Tanda Terima Berkas Tugas Akhir", url: "https://docs.google.com/forms/d/e/1FAIpQLSe5apOobV_VL4CJKSG0HtMLFsclxktmt7sNl0hyRllxq-xfKw/viewform?usp=preview" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
    {
      id: "akademik",
      title: language === 'en' ? "Academic Services" : "Layanan Akademik",
      description: language === 'en'
        ? "Academic administrative services for students including active student certificates, graduation letters, and more."
        : "Layanan administrasi akademik untuk mahasiswa termasuk surat keterangan aktif, surat keterangan lulus, dan lainnya.",
      icon: <GraduationCap className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Academic Documents" : "Dokumen Akademik",
          items: [
            { text: language === 'en' ? "Active Student Certificate Request" : "Permohonan Surat Keterangan Aktif Studi", url: "https://forms.gle/XG1TVHAG7cNkpKEG7" },
            { text: language === 'en' ? "Graduation Certificate Request" : "Permohonan Surat Keterangan Lulus (SKL)", url: "https://forms.gle/njqaU8cs81KwVHiJ9" },
            { text: language === 'en' ? "Academic Document Service Request" : "Permohonan Layanan Dokumen Akademik", url: "https://forms.gle/YbWMvtHvbgKAQPkS7" },
            { text: language === 'en' ? "Class Attendance Dispensation Request" : "Permohonan Dispensasi Perkuliahan", url: "https://docs.google.com/forms/u/0/d/1KgPpebd-SnQsAbTCvkn27H4JNBXS_05Amfd2kUw6YUA/viewform?edit_requested=true" },
            { text: language === 'en' ? "Resignation Request" : "Permohonan Pengunduran Diri", url: "https://docs.google.com/forms/u/0/d/1KgPpebd-SnQsAbTCvkn27H4JNBXS_05Amfd2kUw6YUA/viewform?edit_requested=true" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
    {
      id: "legalisasi",
      title: language === 'en' ? "Document Legalization" : "Legalisasi Dokumen",
      description: language === 'en' 
        ? "Legalization service for official faculty academic documents such as transcripts, diplomas, and certificates."
        : "Layanan legalisasi untuk dokumen akademik resmi fakultas seperti transkrip, ijazah, dan sertifikat.",
      icon: <CheckCircle className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Document Legalization" : "Legalisasi Dokumen",
          items: [
            { text: language === 'en' ? "Document Legalization (Grade Report, Temporary Transcript, Graduation Letter, Student ID, FRS, Active Student Certificate, Accreditation Certificate)" : "Legalisasi Dokumen (KHS, Transkrip Sementara, SKL, KTM, FRS, Surat Keterangan Aktif Studi, Sertifikat Akreditasi)", url: "https://forms.gle/Z7FiBx4B2zMRuUGQ7" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
    {
      id: "perubahan-matkul",
      title: language === 'en' ? "Course Changes/Additions/Removals" : "Layanan Perubahan/Penambahan/Penghapusan Mata Kuliah",
      description: language === 'en'
        ? "Services related to changing, adding, or removing courses in student study plans."
        : "Layanan terkait perubahan, penambahan, atau penghapusan mata kuliah dalam rencana studi mahasiswa.",
      icon: <Edit className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Course Modification Forms" : "Formulir Perubahan Mata Kuliah",
          items: [
            { text: language === 'en' ? "Course Change Request Form" : "Formulir Permohonan Perubahan Mata Kuliah", url: "https://docs.google.com/document/d/1CSE6CAujsTgXA9GUMVi-Axq9aBxThnuC/edit" },
            { text: language === 'en' ? "Course Request Form" : "Formulir Permohonan Mata Kuliah", url: "https://docs.google.com/document/d/1HqhobeyBaDlOkuSqmltCETpP3vW1jJLO/edit" },
            { text: language === 'en' ? "Late Registration/FRS Form" : "Formulir Permohonan Terlambat Perwalian/FRS", url: "https://docs.google.com/document/d/1Iwjr2MURBQJd1LHZCXFMkzhDoDzOlidn/edit" },
            { text: language === 'en' ? "FRS Deletion Request Form" : "Formulir Permohonan Penghapusan FRS", url: "https://docs.google.com/document/d/1mDCfOePs_XZdmhSp3aMhfo_o7Q-3R4Ix/edit" },
            { text: language === 'en' ? "FRS Change Form Collection" : "Pengumpulan Formulir Perubahan FRS", url: "https://forms.gle/EH7tDdrxKaPVAnzN9" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
    {
      id: "kemahasiswaan",
      title: language === 'en' ? "Student Affairs" : "Layanan Kemahasiswaan",
      description: language === 'en'
        ? "Administrative services for student activities, certificates, and other student affairs."
        : "Layanan administrasi untuk kegiatan mahasiswa, sertifikat, dan urusan kemahasiswaan lainnya.",
      icon: <Users className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Student Affairs Services" : "Layanan Kemahasiswaan",
          items: [
            { text: language === 'en' ? "Student Activity Certificate Number Request" : "Permohonan Nomor Sertifikat Kegiatan Mahasiswa", url: "https://docs.google.com/forms/d/1youLu99r0g6uLTEAgX8rNJF5t3b8id-MKk6KsPi_nko/viewform?edit_requested=true" },
            { text: language === 'en' ? "Activity/Proposal Signature Request" : "Permohonan Tanda Tangan Kegiatan/Proposal", url: "https://forms.gle/aiYkVXLen6jThVJf8" },
            { text: language === 'en' ? "Student Assignment Letter Request" : "Permohonan Surat Tugas Mahasiswa", url: "https://forms.gle/7pDSng1cQVmvyWEP9" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
    {
      id: "keuangan",
      title: language === 'en' ? "Financial Services" : "Layanan Keuangan",
      description: language === 'en'
        ? "Financial administrative services for students, including tuition fee related requests."
        : "Layanan administrasi keuangan untuk mahasiswa, termasuk permohonan terkait UKT.",
      icon: <DollarSign className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Financial Services" : "Layanan Keuangan",
          items: [
            { text: language === 'en' ? "Tuition Fee Relief Request" : "Permohonan Keringanan UKT", url: "http://s.itk.ac.id/ukttafsti" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
    {
      id: "humas",
      title: language === 'en' ? "Public Relations" : "Layanan Humas",
      description: language === 'en'
        ? "Services related to FSTI public relations and official social media content."
        : "Layanan terkait hubungan masyarakat FSTI dan konten media sosial resmi.",
      icon: <Globe className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Public Relations Services" : "Layanan Humas",
          items: [
            { text: language === 'en' ? "Official FSTI Instagram Feed Upload Request" : "Permohonan Upload Feed Instagram Official FSTI", url: "http://s.itk.ac.id/fstiprestasi" },
            { text: language === 'en' ? "Official FSTI TikTok Content Upload Request" : "Permohonan Upload Konten Tiktok Official FSTI", url: "https://docs.google.com/forms/d/e/1FAIpQLSf9wlLtNU6pHNfpO20SdFOxUmCpDVBo9CtdVrWwJ1QZX03-Vg/viewform" }
          ]
        }
      ],
      category: "mahasiswa",
      url: "#"
    },
  ];

  // Data layanan dosen
  const dosenLayananList = [
    {
      id: "sistem-informasi-dosen",
      title: language === 'en' ? "Lecturer Information Systems" : "Sistem Informasi Dosen",
      description: language === 'en'
        ? "Access to various academic and administrative information systems for lecturers."
        : "Akses ke berbagai sistem informasi akademik dan administrasi untuk dosen.",
      icon: <Laptop className="h-6 w-6" />,
      subLayanan: [
        {
          title: language === 'en' ? "Information Systems" : "Sistem Informasi",
          items: [
            { text: "SIAKAD", url: "http://gerbang.itk.ac.id/" },
            { text: "SIMPAS", url: "http://simpas.itk.ac.id/" },
            { text: "SIPEKA", url: "http://sipeka.itk.ac.id/" },
            { text: "KULIAH", url: "http://kuliah.itk.ac.id/" },
            { text: "SIMHKI", url: "http://hki.itk.ac.id/" },
            { text: "SISTER", url: "http://sister.itk.ac.id/" },
            { text: language === 'en' ? "Open Data FSTI" : "Open Data FSTI", url: "https://docs.google.com/spreadsheets/d/1Djh8lifyazItpv8tuC2XWYF32kBkueCQaM43x6yEDiU/edit?gid=1389139501#gid=1389139501" }
          ]
        }
      ],
      category: "dosen",
      url: "#"
    },
    {
      id: "pengajuan-surat-cek-plagiat",
      title: language === 'en' ? "Plagiarism Check Letter" : "Pengajuan Surat Ket. Cek Plagiasi Dosen",
      description: language === 'en'
        ? "Service for requesting plagiarism check certificates for lecturer documents."
        : "Layanan pengajuan surat keterangan cek plagiarisme untuk dokumen dosen.",
      icon: <FileText className="h-6 w-6" />,
      url: "https://docs.google.com/forms/d/e/1FAIpQLSersKFA0Nkw_AwSLN1H00MpAkg_2JI1XgX3l39WRcDAPupNHg/viewform",
      category: "dosen"
    },
    {
      id: "template-form-cuti",
      title: language === 'en' ? "Leave Form Template" : "Template Form Cuti",
      description: language === 'en'
        ? "Template forms for lecturer leave requests."
        : "Template formulir untuk pengajuan cuti dosen.",
      icon: <FileSignature className="h-6 w-6" />,
      url: "https://docs.google.com/spreadsheets/d/1dIxHGXbtxJNw13_GY0NFxq580x2OOPMH/edit?usp=sharing&ouid=106706954680118435553&rtpof=true&sd=true",
      category: "dosen"
    },
    {
      id: "layanan-surat-tugas",
      title: language === 'en' ? "Assignment Letter Service" : "Layanan Pengajuan Surat Tugas",
      description: language === 'en'
        ? "Service for requesting assignment letters for lecturers."
        : "Layanan pengajuan surat tugas untuk dosen.",
      icon: <FileText className="h-6 w-6" />,
      url: "https://forms.gle/Cqmep7rLAinZcgjx5",
      category: "dosen"
    },
    {
      id: "peminjaman-sarana",
      title: language === 'en' ? "ITK Facilities and Infrastructure Borrowing" : "Layanan Peminjaman Sarana dan Prasarana ITK",
      description: language === 'en'
        ? "Service for borrowing ITK facilities and infrastructure."
        : "Layanan peminjaman sarana dan prasarana ITK.",
      icon: <Laptop className="h-6 w-6" />,
      url: "https://forms.gle/9E3ddzEHB35xSgjc9",
      category: "dosen"
    },
    {
      id: "pengesahan-dekan",
      title: language === 'en' ? "Dean's Approval" : "Layanan Pengesahan Dekan",
      description: language === 'en'
        ? "Service for requesting dean's approval for academic documents."
        : "Layanan pengajuan pengesahan dekan untuk dokumen akademik.",
      icon: <CheckCircle className="h-6 w-6" />,
      url: "https://forms.gle/P4S93zfuZLjdZkaa9",
      category: "dosen"
    },
    {
      id: "inisiasi-kerjasama",
      title: language === 'en' ? "Cooperation Initiation" : "Layanan Pengajuan Inisiasi Kerjasama",
      description: language === 'en'
        ? "Service for initiating cooperation with external institutions."
        : "Layanan pengajuan inisiasi kerjasama dengan institusi eksternal.",
      icon: <Briefcase className="h-6 w-6" />,
      url: "https://drive.google.com/drive/folders/1vMFpudK1LX3g1ywcOECLE_5S7HgA3vse?usp=sharing",
      category: "dosen"
    },
    {
      id: "kumpulan-sk",
      title: language === 'en' ? "Academic-Non Academic Decrees Collection" : "Kumpulan SK Akademik-Non Akademik",
      description: language === 'en'
        ? "Collection of academic and non-academic decree documents."
        : "Kumpulan dokumen SK akademik dan non-akademik.",
      icon: <Folder className="h-6 w-6" />,
      url: "https://drive.google.com/drive/folders/1vMFpudK1LX3g1ywcOECLE_5S7HgA3vse?usp=sharing",
      category: "dosen"
    },
    {
      id: "template-kp4",
      title: language === 'en' ? "KP4 Form Template" : "Template Form KP4",
      description: language === 'en'
        ? "Template forms for KP4 documentation."
        : "Template formulir untuk dokumentasi KP4.",
      icon: <FileSignature className="h-6 w-6" />,
      url: "https://docs.google.com/document/d/1kkdVJyegHSSDVpgR2bfqlHBxRfQyIT1p/edit?usp=sharing&ouid=106706954680118435553&rtpof=true&sd=true",
      category: "dosen"
    },
    {
      id: "pengajuan-sk-rektor",
      title: language === 'en' ? "Rector's Decree Request" : "Layanan Pengajuan SK Rektor",
      description: language === 'en'
        ? "Service for requesting rector's decree for academic activities."
        : "Layanan pengajuan SK Rektor untuk kegiatan akademik.",
      icon: <Award className="h-6 w-6" />,
      url: "https://docs.google.com/forms/d/e/1FAIpQLSe9fYni6UDE8ipSnycheBaqaLyJyAoizqmUmBWuzwifx4auJQ/viewform?usp=sharing",
      category: "dosen"
    },
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
              <p className="text-gray-700 text-lg mb-6">
                {t('services.description')}
              </p>
              
              {/* Template Dokumen */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center">
              <div className="text-gray-700">
                <span className="font-medium">
                  {language === 'en' ? 'Document Templates:' : 'Template Dokumen:'}
                </span>
                <span className="ml-2">
                  <a
                    href="/file/Format Surat Akademik 2024.pdf"
                    className="font-semibold text-primary-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Format Surat Akademik 2024.pdf"
                  >
                    {language === 'en' ? 'Student Academic Form Template' : 'Template Formulir Akademik Mahasiswa'}
                  </a>
                </span>
              </div>
            </div>

              {/* Estimasi Waktu Proses */}
              <div className="bg-gray-50 rounded-xl p-4 mb-10 text-center">
                <div className="text-gray-700">
                  <span className="font-medium">
                    {language === 'en' ? 'Estimated Processing Time:' : 'Estimasi Waktu Proses:'} 
                  </span>
                  <span className="font-semibold text-primary-600 ml-2">
                    {language === 'en' ? '1-2 working days' : '1-2 hari kerja'}
                  </span>
                </div>
              </div>
              
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
                      
                      {/* Kode untuk menampilkan daftar sub-layanan atau tombol untuk layanan tanpa subLayanan */}
                      {layanan.hasOwnProperty('subLayanan') && 'subLayanan' in layanan ? (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-gray-800">
                            {language === 'en' ? 'Related Links' : 'Tautan Terkait'}
                          </h4>
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
                      ) : layanan.url && layanan.url !== '#' ? (
                        <div className="mt-4">
                          <a
                            href={layanan.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/80 transition-colors duration-200"
                          >
                            {language === 'en' ? 'Access Service' : 'Akses Layanan'}
                          </a>
                        </div>
                      ) : null}
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