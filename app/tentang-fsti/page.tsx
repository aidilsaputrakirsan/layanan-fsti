"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';
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
  Zap
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
    "Jurusan Sains dan Analitika Data": [
      {
        name: "Matematika",
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "S.Math."
      },
      {
        name: "Ilmu Aktuaria", 
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "S.Aktr."
      },
      {
        name: "Statistika",
        akreditasi: language === 'en' ? "Good" : "Baik", 
        gelar: "S.Stat."
      },
      {
        name: "Fisika",
        akreditasi: language === 'en' ? "Good to Excellent" : "Baik Sekali",
        gelar: "S.Si"
      }
    ],
    "Jurusan Teknik Elektro, Informatika, dan Bisnis": [
      {
        name: "Informatika",
        akreditasi: language === 'en' ? "Good to Excellent and ASIIN" : "Baik Sekali dan ASIIN",
        gelar: "S.Kom."
      },
      {
        name: "Sistem Informasi",
        akreditasi: language === 'en' ? "Good to Excellent and ASIIN" : "Baik Sekali dan ASIIN", 
        gelar: "S.Kom."
      },
      {
        name: "Bisnis Digital",
        akreditasi: language === 'en' ? "Good" : "Baik",
        gelar: "S.Bns."
      },
      {
        name: "Teknik Elektro",
        akreditasi: language === 'en' ? "Good to Excellent and ASIIN" : "Baik Sekali dan ASIIN",
        gelar: "S.T."
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
      nama: "Staff Administrasi",
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
    { nama: "Dr. Koordinator Matematika", jabatan: "Koordinator Program Studi Matematika", foto: "/images/koorpro-mat.jpg" },
    { nama: "Dr. Koordinator Aktuaria", jabatan: "Koordinator Program Studi Ilmu Aktuaria", foto: "/images/koorpro-akt.jpg" },
    { nama: "Dr. Koordinator Statistika", jabatan: "Koordinator Program Studi Statistika", foto: "/images/koorpro-stat.jpg" },
    { nama: "Dr. Koordinator Fisika", jabatan: "Koordinator Program Studi Fisika", foto: "/images/koorpro-fis.jpg" },
    { nama: "Dr. Koordinator Informatika", jabatan: "Koordinator Program Studi Informatika", foto: "/images/koorpro-if.jpg" },
    { nama: "Dr. Koordinator Sistem Informasi", jabatan: "Koordinator Program Studi Sistem Informasi", foto: "/images/koorpro-si.jpg" },
    { nama: "Dr. Koordinator Bisnis Digital", jabatan: "Koordinator Program Studi Bisnis Digital", foto: "/images/koorpro-bd.jpg" },
    { nama: "Dr. Koordinator Teknik Elektro", jabatan: "Koordinator Program Studi Teknik Elektro", foto: "/images/koorpro-te.jpg" }
  ];

  // Data 5 Kepala Laboratorium (dari gambar 4-5)
  const kepalaLaboratorium = [
    {
      nama: "Meidi Arisalwadi, S.Si, M.Si",
      jabatan: language === 'en' ? "Head of Advanced Physics Laboratory" : "Kepala Laboratorium Fisika Lanjut",
      foto: "/images/kalab-fisika-lanjut.jpg"
    },
    {
      nama: "Fadli Robiandi, S.Si, M.Si", 
      jabatan: language === 'en' ? "Head of Basic Physics Laboratory" : "Kepala Laboratorium Fisika Dasar",
      foto: "/images/kalab-fisika-dasar.jpg"
    },
    {
      nama: "Boby Mugi Pratama, S.Si, M.Han",
      jabatan: language === 'en' ? "Head of Intelligent Systems Laboratory" : "Kepala Laboratorium Sistem Cerdas", 
      foto: "/images/kalab-sistem-cerdas.jpg"
    },
    {
      nama: "Dr. Moh. Januar Ismail Burhan, S.Si, M.Si",
      jabatan: language === 'en' ? "Head of Computing and Data Laboratory" : "Kepala Laboratorium Komputasi dan Data",
      foto: "/images/kalab-komputasi-data.jpg"
    },
    {
      nama: "Aidil Saputra Kirsan, S.ST., M.TR.KOM.",
      jabatan: language === 'en' ? "Head of Digital Innovation Laboratory" : "Kepala Laboratorium Inovasi Digital",
      foto: "/images/kalab-inovasi-digital.jpg"
    }
  ];

  // Data Prestasi
  const prestasi = [
    {
      title: language === 'en' ? "National Mathematics Competition Champion" : "Juara Kompetisi Matematika Nasional",
      description: language === 'en' ? "FSTI students won 1st place in the National Mathematics Olympiad 2024" : "Mahasiswa FSTI meraih juara 1 Olimpiade Matematika Nasional 2024",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "International Research Publication" : "Publikasi Riset Internasional", 
      description: language === 'en' ? "50+ international journal publications by FSTI faculty in 2024" : "50+ publikasi jurnal internasional oleh dosen FSTI di tahun 2024",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Best Innovation Award" : "Penghargaan Inovasi Terbaik",
      description: language === 'en' ? "FSTI innovation team won the Best Innovation Award at ITK Innovation Expo 2024" : "Tim inovasi FSTI meraih penghargaan Best Innovation Award di ITK Innovation Expo 2024", 
      icon: <Award className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "International Accreditation" : "Akreditasi Internasional",
      description: language === 'en' ? "3 study programs obtained ASIIN international accreditation" : "3 program studi meraih akreditasi internasional ASIIN",
      icon: <Star className="w-6 h-6" />
    }
  ];

  // Data Fasilitas
  const fasilitas = [
    {
      title: language === 'en' ? "Modern Classrooms" : "Ruang Kuliah Modern",
      description: language === 'en' ? "Air-conditioned classrooms equipped with projectors and sound systems" : "Ruang kuliah ber-AC dilengkapi proyektor dan sound system",
      icon: <Building className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Advanced Computing Laboratory" : "Laboratorium Komputasi Canggih",
      description: language === 'en' ? "High-spec computers for programming, data analysis, and simulations" : "Komputer berspesifikasi tinggi untuk programming, analisis data, dan simulasi",
      icon: <Laptop className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Physics Laboratory" : "Laboratorium Fisika",
      description: language === 'en' ? "Complete equipment for basic and advanced physics experiments" : "Peralatan lengkap untuk eksperimen fisika dasar dan lanjut",
      icon: <Microscope className="w-6 h-6" />
    },
    { 
      title: language === 'en' ? "High-Speed Internet Network" : "Jaringan Internet Kecepatan Tinggi",
      description: language === 'en' ? "Fiber optic network supporting all academic and research activities" : "Jaringan fiber optik mendukung seluruh kegiatan akademik dan penelitian",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Digital Library" : "Perpustakaan Digital", 
      description: language === 'en' ? "Access to thousands of international journals and e-books" : "Akses ke ribuan jurnal internasional dan e-book",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: language === 'en' ? "Student Activity Space" : "Ruang Aktivitas Mahasiswa",
      description: language === 'en' ? "Comfortable spaces for discussions, organizations, and student creativity" : "Ruang nyaman untuk diskusi, organisasi, dan kreativitas mahasiswa", 
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">8</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Study Programs' : 'Program Studi'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">2</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Departments' : 'Jurusan'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">5</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Laboratories' : 'Laboratorium'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">50+</div>
                  <div className="text-gray-600 text-sm">{language === 'en' ? 'Faculty Members' : 'Dosen'}</div>
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
                        
                        <div className="mt-4 pt-4 border-t border-primary-200">
                          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                            {language === 'en' ? 'View Curriculum' : 'Lihat Kurikulum'}
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </button>
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

      {/* Struktur Organisasi Section */}
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
                <div className="inline-block bg-white rounded-xl shadow-md p-6 hover-card">
                  <img 
                    src={strukturOrganisasi[0].foto} 
                    alt={strukturOrganisasi[0].nama}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100"
                  />
                  <h3 className="font-bold text-gray-800 mb-1">{strukturOrganisasi[0].nama}</h3>
                  <p className="text-primary-600 text-sm">{strukturOrganisasi[0].jabatan}</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Wakil Dekan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {strukturOrganisasi.slice(1, 3).map((pejabat, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={(index + 2) * 0.1}>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover-card">
                    <img 
                      src={pejabat.foto} 
                      alt={pejabat.nama}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100"
                    />
                    <h4 className="font-bold text-gray-800 mb-1">{pejabat.nama}</h4>
                    <p className="text-primary-600 text-sm">{pejabat.jabatan}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Level 3: Kasubbag */}
            <div className="flex justify-center mb-8">
              <AnimatedSection animation="slideUp" delay={0.4}>
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover-card">
                  <img 
                    src={strukturOrganisasi[3].foto} 
                    alt={strukturOrganisasi[3].nama}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100"
                  />
                  <h4 className="font-bold text-gray-800 mb-1">{strukturOrganisasi[3].nama}</h4>
                  <p className="text-primary-600 text-sm">{strukturOrganisasi[3].jabatan}</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Level 4: Kajur (dibawah Wakil Dekan I) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strukturOrganisasi.slice(4).map((pejabat, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={(index + 5) * 0.1}>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover-card">
                    <img 
                      src={pejabat.foto} 
                      alt={pejabat.nama}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100"
                    />
                    <h4 className="font-bold text-gray-800 mb-1">{pejabat.nama}</h4>
                    <p className="text-primary-600 text-sm">{pejabat.jabatan}</p>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {koordinatorProdi.map((koor, index) => (
                  <AnimatedSection key={index} animation="slideUp" delay={index * 0.1}>
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center hover-card">
                      <img 
                        src={koor.foto} 
                        alt={koor.nama}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-primary-100"
                      />
                      <h5 className="font-medium text-gray-800 text-sm mb-1">{koor.nama}</h5>
                      <p className="text-primary-600 text-xs">{koor.jabatan}</p>
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
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Row 1: 3 labs */}
              {kepalaLaboratorium.slice(0, 3).map((kalab, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl p-6 text-center hover-card">
                    <img 
                      src={kalab.foto} 
                      alt={kalab.nama}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-accent/20"
                    />
                    <h4 className="font-bold text-gray-800 mb-2">{kalab.nama}</h4>
                    <p className="text-accent text-sm leading-tight">{kalab.jabatan}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Row 2: 2 labs centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
              {kepalaLaboratorium.slice(3).map((kalab, index) => (
                <AnimatedSection key={index + 3} animation="slideUp" delay={(index + 3) * 0.1}>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl p-6 text-center hover-card">
                    <img 
                      src={kalab.foto} 
                      alt={kalab.nama}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-accent/20"
                    />
                    <h4 className="font-bold text-gray-800 mb-2">{kalab.nama}</h4>
                    <p className="text-accent text-sm leading-tight">{kalab.jabatan}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              {language === 'en' ? 'Achievements' : 'Prestasi'}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Fasilitas Section */}
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
      <section className="py-16 bg-gradient-to-b from-light-bg to-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-2xl font-display font-bold mb-6 text-gray-800">
              {language === 'en' ? 'Want to Learn More?' : 'Ingin Tahu Lebih Lanjut?'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Visit our official website or contact us directly to get more information about FSTI ITK.'
                : 'Kunjungi website resmi kami atau hubungi kami langsung untuk mendapatkan informasi lebih lanjut tentang FSTI ITK.'
              }
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://itk.ac.id" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                <Globe className="w-5 h-5 mr-2" />
                {language === 'en' ? 'ITK Official Website' : 'Website Resmi ITK'}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="mailto:fsti@itk.ac.id"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default TentangFSTIPage;