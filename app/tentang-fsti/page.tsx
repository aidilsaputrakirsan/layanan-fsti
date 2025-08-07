"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Button from '@/components/ui/Button';
import {
  GraduationCap,
  Users,
  Award,
  Building,
  BookOpen,
  Laptop,
  Microscope,
  Target,
  Eye,
  ChevronLeft,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Trophy,
  Star,
  Zap,
  Home,
  Activity,
  Bus,
  Heart
} from 'lucide-react';

const TentangFSTIPage = () => {
  const { t, language } = useLanguage();

  // Data Visi Misi (dari gambar 1)
  const visiMisi = {
    visi: language === 'en' 
      ? "By 2029, the Faculty of Science and Information Technology (FSTI) ITK will become a center of excellence in the field of academic and innovation, producing competitive, adaptive, globally empowered graduates, and works in the field of science and information technology that benefits the progress of Kalimantan and Indonesia."
      : "Pada tahun 2029, Fakultas Sains dan Teknologi Informasi (FSTI) ITK akan menjadi pusat keunggulan akademik dan inovasi, menghasilkan lulusan yang kompeten, adaptif, berdaya saing global, dan karya-karya dalam bidang sains dan teknologi informasi yang berdampak bagi kemajuan Kalimantan dan Indonesia",
    
    misi: language === 'en' ? [
      "Quality Education",
      "Leading Research and Innovation", 
      "Collaborative Ecosystem",
      "Synergy",
      "Optimal Governance",
      "Civic Potential Activation",
      "Prime Service System",
      "Internationalization"
    ] : [
      "Pendidikan Berkualitas",
      "Riset dan Inovasi Terdepan",
      "Ekosistem Kolaboratif", 
      "Sinergi",
      "Tata Kelola Optimal",
      "Aktivasi Potensi Civitas",
      "Sistem Layanan Prima",
      "Internasionalisasi"
    ]
  };

  // Helper function untuk highlight huruf pertama (PRESTASI)
  const highlightFirstLetter = (text: string) => {
    if (!text) return text;
    const firstLetter = text.charAt(0);
    const restOfText = text.slice(1);
    return (
      <>
        <span className="font-bold text-primary-700">{firstLetter}</span>
        {restOfText}
      </>
    );
  };

  // Data Program Studi (dari gambar 3)
  const programStudi = {
    "Jurusan Teknik Elektro, Informatika, dan Bisnis": [
      {
        name: "Teknik Elektro",
        akreditasi: language === 'en' ? "Good to Excellent and ASIIN" : "Baik Sekali dan ASIIN",
        gelar: "S.T.",
        website: "https://ee.itk.ac.id/" // Tambahkan website URL
      },
      {
        name: "Sistem Informasi",
        akreditasi: language === 'en' ? "Good to Excellent and ASIIN" : "Baik Sekali dan ASIIN", 
        gelar: "S.Kom.",
        website: "https://is.itk.ac.id" // Tambahkan website URL
      },
      {
        name: "Informatika",
        akreditasi: language === 'en' ? "Good to Excellent and ASIIN" : "Baik Sekali dan ASIIN",
        gelar: "S.Kom.",
        website: "https://if.itk.ac.id" // Tambahkan website URL
      },
      {
        name: "Bisnis Digital",
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "S.Bns.",
        website: "https://bisnisdigital.itk.ac.id/" // Tambahkan website URL
      },
      {
        name: "Magister Manajemen Teknologi",
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "M.MT.",
        website: "https://itk.ac.id/pasca-mmt" // Tambahkan website URL
      }
    ],

    "Jurusan Sains dan Analitika Data": [
      {
        name: "Fisika",
        akreditasi: language === 'en' ? "Good to Excellent" : "Baik Sekali",
        gelar: "S.Si",
        website: "https://phy.itk.ac.id/" // Tambahkan website URL
      },
      {
        name: "Matematika",
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "S.Math.",
        website: "https://math.itk.ac.id" // Tambahkan website URL
      },
      {
        name: "Statistika",
        akreditasi: language === 'en' ? "Good" : "Baik", 
        gelar: "S.Stat.",
        website: "https://stat.itk.ac.id" // Tambahkan website URL
      },
      {
        name: "Ilmu Aktuaria", 
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "S.Aktr.",
        website: "https://actsci.itk.ac.id/" // Tambahkan website URL
      }
    ]
    
  };

  // Data Struktur Organisasi (dengan foto)
  const strukturOrganisasi = [
    {
      nama: "Adi Mahmud Jaya Marindra, S.T., M.Eng., Ph.D.",
      jabatan: language === 'en' ? "Dean" : "Dekan",
      foto: "/images/pimpinan/dekan.png",
      level: 1
    },
    {
      nama: "Irma Fitria, S.Si., M.Si.",
      jabatan: language === 'en' ? "Vice Dean I (Academic and Student Affairs)" : "Wakil Dekan I (Akademik dan Kemahasiswaan)",
      foto: "/images/pimpinan/wd1.png", 
      level: 2
    },
    {
      nama: "Yun Tonce Kusuma Priyanto, S.T., M.T.",
      jabatan: language === 'en' ? "Vice Dean II (Finance and General Affairs)" : "Wakil Dekan II (Keuangan dan Umum)",
      foto: "/images/pimpinan/wd2.png",
      level: 2
    },
    {
      nama: "Desy Ridho Rahayu, S.Si",
      jabatan: language === 'en' ? "Head of General Sub-Division" : "Kepala Sub Bagian Umum", 
      foto: "/images/pimpinan/kasubbag.png",
      level: 3
    },
    {
      nama: "Dr. Swastya Rahastama, S.Si., M.Si.",
      jabatan: language === 'en' ? "Head of Science and Data Analytics Department" : "Ketua Jurusan Sains dan Analitika Data",
      foto: "/images/pimpinan/kajur-sad.png",
      level: 3
    },
    {
      nama: "M. Ihsan Alfani Putera, S.Tr.Kom, M.Kom",
      jabatan: language === 'en' ? "Head of Electrical Engineering, Informatics, and Business Department" : "Ketua Jurusan Teknik Elektro, Informatika, dan Bisnis", 
      foto: "/images/pimpinan/kajur-teib.png",
      level: 3
    }
  ];

  // Data 8 Koordinator Program Studi
  const koordinatorProdi = [
    { nama: "Kharis Sugiarto, S.T., M.T", jabatan: "Koordinator Program Studi Teknik Elektro", foto: "/images/pimpinan/koorpro-te.png" },
    { nama: "Sri Rahayu Natasia, S.Komp., M.Si., M.Sc", jabatan: "Koordinator Program Studi Sistem Informasi", foto: "/images/pimpinan/koorpro-si.png" },
    { nama: "Nisa Rizqiya Fadhliana, S.Kom., M.T", jabatan: "Koordinator Program Studi Informatika", foto: "/images/pimpinan/koorpro-if.png" },
    { nama: "Deli Yansyah, S.E., M.Acc., Ak., CA", jabatan: "Koordinator Program Studi Bisnis Digital", foto: "/images/pimpinan/koorpro-bd.png" },
    { nama: "Bima Prihasto, Ph.D.", jabatan: "Koordinator Program Studi Magister Manajemen Teknologi", foto: "/images/pimpinan/koorpro-mmt.png" },
    
    { nama: "Febrian Dedi Sastrawan, S.Si., M.Sc", jabatan: "Koordinator Program Studi Fisika", foto: "/images/pimpinan/koorpro-fis.png" },
    { nama: "Kartika Nugraheni, S.Si., M.Si.", jabatan: "Koordinator Program Studi Matematika", foto: "/images/pimpinan/koorpro-mat.png" },
    { nama: "Diana Nurlaily, S.Si., M.Stat", jabatan: "Koordinator Program Studi Statistika", foto: "/images/pimpinan/koorpro-stat.png" },
    { nama: "Muhammad Azka, S.Si., M.Sc", jabatan: "Koordinator Program Studi Ilmu Aktuaria", foto: "/images/pimpinan/koorpro-akt.png" },
    
  ];

  // Data 5 Kepala Laboratorium (dari gambar 4-5)
  const kepalaLaboratorium = [
    {
      nama: "Meidi Arisalwadi, S.Si, M.Si",
      jabatan: language === 'en' ? "Head of Advanced Physics Laboratory" : "Kepala Laboratorium Fisika Lanjut",
      foto: "/images/pimpinan/kalab-fisika-lanjut.png"
    },
    {
      nama: "Fadli Robiandi, S.Si, M.Si", 
      jabatan: language === 'en' ? "Head of Basic Physics Laboratory" : "Kepala Laboratorium Fisika Dasar",
      foto: "/images/pimpinan/kalab-fisika-dasar.png"
    },
    {
      nama: "Dr. Moh. Januar Ismail Burhan, S.Si, M.Si",
      jabatan: language === 'en' ? "Head of Computing and Data Laboratory" : "Kepala Laboratorium Komputasi dan Data",
      foto: "/images/pimpinan/kalab-komputasi-data.png"
    },
    {
      nama: "Aidil Saputra Kirsan, S.ST., M.Tr.Kom.",
      jabatan: language === 'en' ? "Head of Digital Innovation Laboratory" : "Kepala Laboratorium Inovasi Digital",
      foto: "/images/pimpinan/kalab-inovasi-digital.png"
    },
    {
      nama: "Boby Mugi Pratama, S.Si, M.Han",
      jabatan: language === 'en' ? "Head of Intelligent Systems Laboratory" : "Kepala Laboratorium Sistem Cerdas", 
      foto: "/images/pimpinan/kalab-sistem-cerdas.png"
    },
  ];

  // ===== DATA PRESTASI YANG TERVERIFIKASI 100% =====
  const prestasi = [
    {
      title: language === 'en' ? "International ASIIN Accreditation" : "Akreditasi Internasional ASIIN",
      description: language === 'en' ? "Informatics, Information Systems, and Electrical Engineering programs have achieved ASIIN international accreditation" : "Program Studi Informatika, Sistem Informasi, dan Teknik Elektro telah meraih akreditasi internasional ASIIN",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Bronze Medal MaG-D XVI 2025" : "Medali Perunggu MaG-D XVI 2025",
      description: language === 'en' ? "ITK Mathematics students Awanda Adel Liyanto Putri and Tegar Dwi Nugraha won bronze medal at Mathematical Analysis and Geometry Day XVI 2025" : "Mahasiswa Matematika ITK Awanda Adel Liyanto Putri dan Tegar Dwi Nugraha meraih medali perunggu di Mathematical Analysis and Geometry Day XVI 2025",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "3rd Place TTG Competition 2025" : "Juara 3 Lomba TTG 2025",
      description: language === 'en' ? "ITK Chemical Engineering students won 3rd place in North Balikpapan Appropriate Technology Competition 2025 with SCANOT supercapacitor innovation" : "Mahasiswa Teknik Kimia ITK meraih Juara 3 Lomba Teknologi Tepat Guna Balikpapan Utara 2025 dengan inovasi Superkapasitor SCANOT",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "1st Place UI/UX Design" : "Juara 1 Desain UI/UX",
      description: language === 'en' ? "Team Rusdisain from Information Systems Study Program ITK won 1st place in UI/UX Design competition at MIT WEEK UNMUL" : "Tim Rusdisain dari Program Studi Sistem Informasi ITK meraih Juara 1 kompetisi Desain UI/UX MIT WEEK UNMUL",
      icon: <Laptop className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "2nd Place Choir Competition" : "Juara 2 Paduan Suara",
      description: language === 'en' ? "ITK Student Choir achieved 2nd place in Symphony of Voices 2024 competition" : "Paduan Suara Mahasiswa ITK meraih Juara 2 di lomba Symphony of Voices 2024",
      icon: <Star className="w-6 h-6" />
    }
  ];

  // ===== DATA FASILITAS YANG TERVERIFIKASI 100% =====
  const fasilitas = [
    {
      title: language === 'en' ? "Integrated Laboratory" : "Laboratorium Terpadu",
      description: language === 'en' ? "15 laboratory rooms supporting student learning and research across various study programs" : "15 ruang laboratorium yang mendukung pembelajaran dan penelitian mahasiswa di berbagai program studi",
      icon: <Microscope className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Library" : "Perpustakaan",
      description: language === 'en' ? "UPA ITK Library serves as a learning resource center and scientific information provider for the academic community" : "UPA Perpustakaan ITK sebagai pusat sumber belajar dan penyedia informasi ilmiah bagi civitas akademika",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Student Dormitory" : "Asrama Mahasiswa",
      description: language === 'en' ? "Accommodation facilities for students who need housing within the campus" : "Fasilitas tempat tinggal bagi mahasiswa yang membutuhkan akomodasi di dalam kampus",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Sports Facilities" : "Fasilitas Olahraga",
      description: language === 'en' ? "Sports fields and fitness center to support student physical activities" : "Lapangan olahraga dan pusat kebugaran untuk mendukung aktivitas fisik mahasiswa",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Al-Fatih Mosque" : "Masjid Al-Fatih",
      description: language === 'en' ? "Adequate worship facilities for religious activities of the academic community" : "Fasilitas ibadah yang memadai untuk kegiatan keagamaan civitas akademika",
      icon: <Building className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Health Services" : "Layanan Kesehatan",
      description: language === 'en' ? "Campus clinic providing basic health services for students and staff" : "Klinik kampus yang menyediakan pelayanan kesehatan dasar bagi mahasiswa dan staff",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Integrated Service Unit" : "Unit Pelayanan Terpadu",
      description: language === 'en' ? "Integrated administrative services for academic and non-academic affairs convenience" : "Layanan administrasi terpadu untuk kemudahan urusan akademik dan non-akademik",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
                {language === 'en' ? 'About FSTI' : 'Tentang FSTI'}
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                {language === 'en' 
                  ? 'Faculty of Science and Information Technology - Kalimantan Institute of Technology'
                  : 'Fakultas Sains dan Teknologi Informasi - Institut Teknologi Kalimantan'
                }
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">2</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Departments' : 'Jurusan'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">9</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Study Programs' : 'Program Studi'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">5</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Laboratories' : 'Laboratorium'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">118</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Faculty Members' : 'Dosen'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">6</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Staff' : 'Tendik'}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Visi dan Misi Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Vision and Mission' : 'Visi dan Misi FSTI'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visi */}
              <AnimatedSection animation="slideUp" delay={0.1}>
                <div className="bg-white rounded-xl shadow-md p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {language === 'en' ? 'Vision' : 'Visi'}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {visiMisi.visi}
                  </p>
                </div>
              </AnimatedSection>

              {/* Misi */}
              <AnimatedSection animation="slideUp" delay={0.2}>
                <div className="bg-white rounded-xl shadow-md p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {language === 'en' ? 'Mission: Excellence' : 'Misi: Prestasi'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {visiMisi.misi.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{highlightFirstLetter(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Program Studi Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Study Programs' : 'Program Studi'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            {Object.entries(programStudi).map(([jurusan, prodis], jurusanIndex) => (
              <div key={jurusan} className="mb-12">
                <AnimatedSection animation="slideUp" delay={jurusanIndex * 0.1}>
                  <h3 className="text-xl font-bold mb-6 text-primary-600 text-center">{jurusan}</h3>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {prodis.map((prodi, index) => (
                    <AnimatedSection key={index} animation="slideUp" delay={(jurusanIndex * prodis.length + index) * 0.1}>
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 hover-card">
                        <div className="flex items-center mb-4">
                          <GraduationCap className="w-8 h-8 text-primary-600 mr-3" />
                          <h4 className="font-bold text-primary-800">{prodi.name}</h4>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">{language === 'en' ? 'Accreditation' : 'Akreditasi'}:</span>
                            <span className="font-medium text-gray-800">{prodi.akreditasi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{language === 'en' ? 'Degree' : 'Gelar'}:</span>
                            <span className="font-medium text-gray-800">{prodi.gelar}</span>
                          </div>
                        </div>
                        
                        {/* ===== BAGIAN YANG DIUPDATE: Button menjadi Link ===== */}
                        <div className="mt-4 pt-4 border-t border-primary-200">
                          <a 
                            href={prodi.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center transition-colors"
                          >
                            {language === 'en' ? 'Visit Website' : 'Lihat Website'}
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section - FIXED STYLE */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Organizational Structure' : 'Struktur Organisasi'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            {/* Dekan */}
            <div className="text-center mb-8">
              <AnimatedSection animation="slideUp" delay={0.1}>
                <div className="relative hover-card group mx-auto" style={{width: '250px'}}>
                  <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={strukturOrganisasi[0].foto} 
                      alt={strukturOrganisasi[0].nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay gradient untuk text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    {/* Text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-sm mb-1 leading-tight">{strukturOrganisasi[0].nama}</h3>
                      <p className="text-primary-200 text-xs leading-tight">{strukturOrganisasi[0].jabatan}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Wakil Dekan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-lg mx-auto">
              {strukturOrganisasi.slice(1, 3).map((pejabat, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={(index + 2) * 0.1}>
                  <div className="relative hover-card group">
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={pejabat.foto} 
                        alt={pejabat.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay gradient untuk text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h4 className="font-bold text-xs mb-1 leading-tight">{pejabat.nama}</h4>
                        <p className="text-primary-200 text-xs leading-tight">{pejabat.jabatan}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Level 3: Kasubbag */}
            <div className="flex justify-center mb-8">
              <AnimatedSection animation="slideUp" delay={0.4}>
                <div className="relative hover-card group" style={{width: '160px'}}>
                  <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={strukturOrganisasi[3].foto} 
                      alt={strukturOrganisasi[3].nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay gradient untuk text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    {/* Text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="font-bold text-xs mb-1 leading-tight">{strukturOrganisasi[3].nama}</h4>
                      <p className="text-primary-200 text-xs leading-tight">{strukturOrganisasi[3].jabatan}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Level 4: Kajur (dibawah Wakil Dekan I) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
              {strukturOrganisasi.slice(4).map((pejabat, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={(index + 5) * 0.1}>
                  <div className="relative hover-card group">
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={pejabat.foto} 
                        alt={pejabat.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay gradient untuk text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h4 className="font-bold text-xs mb-1 leading-tight">{pejabat.nama}</h4>
                        <p className="text-primary-200 text-xs leading-tight">{pejabat.jabatan}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Koordinator Program Studi */}
            <div className="mt-12">
              <AnimatedSection animation="slideUp">
                <h3 className="text-xl font-bold text-center mb-8 text-gray-800">
                  {language === 'en' ? 'Program Study Coordinators' : 'Koordinator Program Studi'}
                </h3>
              </AnimatedSection>
              
              {/* Baris 1: 4 Koordinator Teknik Elektro, Informatika, dan Bisnis */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {koordinatorProdi.slice(0, 4).map((koor, index) => (
                  <AnimatedSection key={index} animation="slideUp" delay={index * 0.1}>
                    <div className="relative hover-card group">
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={koor.foto} 
                          alt={koor.nama}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                          <h5 className="font-medium text-xs mb-1 leading-tight">{koor.nama}</h5>
                          <p className="text-primary-200 text-xs leading-tight">{koor.jabatan}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Baris 2: 1 Koordinator MMT (Kiri) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <AnimatedSection animation="slideUp" delay={0.4}>
                  <div className="relative hover-card group">
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={koordinatorProdi[4].foto} 
                        alt={koordinatorProdi[4].nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                        <h5 className="font-medium text-xs mb-1 leading-tight">{koordinatorProdi[4].nama}</h5>
                        <p className="text-primary-200 text-xs leading-tight">{koordinatorProdi[4].jabatan}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Baris 3: 4 Koordinator Sains dan Analitika Data */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {koordinatorProdi.slice(5).map((koor, index) => (
                  <AnimatedSection key={index + 5} animation="slideUp" delay={(index + 5) * 0.1}>
                    <div className="relative hover-card group">
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={koor.foto} 
                          alt={koor.nama}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                          <h5 className="font-medium text-xs mb-1 leading-tight">{koor.nama}</h5>
                          <p className="text-primary-200 text-xs leading-tight">{koor.jabatan}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratorium Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Laboratories' : 'Laboratorium'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Row 1: 3 labs */}
              {kepalaLaboratorium.slice(0, 3).map((kalab, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={index * 0.1}>
                  <div className="relative hover-card group">
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={kalab.foto} 
                        alt={kalab.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay gradient untuk text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="font-bold text-sm mb-2 leading-tight">{kalab.nama}</h4>
                        <p className="text-accent-200 text-xs leading-tight">{kalab.jabatan}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Row 2: 2 labs centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
              {kepalaLaboratorium.slice(3).map((kalab, index) => (
                <AnimatedSection key={index + 3} animation="slideUp" delay={(index + 3) * 0.1}>
                  <div className="relative hover-card group">
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={kalab.foto} 
                        alt={kalab.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay gradient untuk text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="font-bold text-sm mb-2 leading-tight">{kalab.nama}</h4>
                        <p className="text-accent-200 text-xs leading-tight">{kalab.jabatan}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi Section - DATA TERVERIFIKASI */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Achievements' : 'Prestasi'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prestasi.map((item, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={index * 0.1}>
                  <div className="bg-white rounded-xl shadow-md p-6 hover-card text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-yellow-600">{item.icon}</div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Section - DATA TERVERIFIKASI */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Facilities' : 'Fasilitas'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fasilitas.map((item, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 hover-card">
                    <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mb-4">
                      <div className="text-primary-600">{item.icon}</div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

export default TentangFSTIPage;