"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  HelpCircle, 
  RotateCw
} from 'lucide-react';

// Mock data for demonstrating tracking functionality
const mockDocuments = [
  {
    id: "REF-2025030001",
    type: "Surat Pengantar KP",
    date: "12 Maret 2025",
    status: "completed",
    timeline: [
      {
        title: "Pengajuan Diterima",
        description: "Dokumen telah diterima dan sedang diverifikasi",
        date: "12 Maret 2025, 09:30 WITA",
        status: "completed"
      },
      {
        title: "Verifikasi Selesai",
        description: "Dokumen telah diverifikasi dan sedang diproses",
        date: "12 Maret 2025, 14:45 WITA",
        status: "completed"
      },
      {
        title: "Dalam Proses",
        description: "Dokumen sedang dalam proses pengesahan",
        date: "13 Maret 2025, 10:15 WITA",
        status: "completed"
      },
      {
        title: "Selesai",
        description: "Dokumen siap untuk diambil atau dikirim",
        date: "14 Maret 2025, 13:20 WITA",
        status: "completed"
      }
    ]
  },
  {
    id: "REF-2025030002",
    type: "Legalisasi Dokumen",
    date: "14 Maret 2025",
    status: "in-progress",
    timeline: [
      {
        title: "Pengajuan Diterima",
        description: "Dokumen telah diterima dan sedang diverifikasi",
        date: "14 Maret 2025, 10:15 WITA",
        status: "completed"
      },
      {
        title: "Verifikasi Selesai",
        description: "Dokumen telah diverifikasi dan sedang diproses",
        date: "14 Maret 2025, 15:30 WITA",
        status: "completed"
      },
      {
        title: "Dalam Proses",
        description: "Dokumen sedang dalam proses pengesahan",
        date: "15 Maret 2025, 09:45 WITA",
        status: "active"
      },
      {
        title: "Selesai",
        description: "Dokumen siap untuk diambil atau dikirim",
        date: "-",
        status: "pending"
      }
    ]
  },
  {
    id: "REF-2025030003",
    type: "Surat Beasiswa",
    date: "10 Maret 2025",
    status: "pending",
    timeline: [
      {
        title: "Pengajuan Diterima",
        description: "Dokumen telah diterima dan sedang diverifikasi",
        date: "10 Maret 2025, 11:05 WITA",
        status: "completed"
      },
      {
        title: "Verifikasi Dokumen",
        description: "Dokumen sedang dalam proses verifikasi",
        date: "-",
        status: "active"
      },
      {
        title: "Dalam Proses",
        description: "Dokumen sedang dalam proses pengesahan",
        date: "-",
        status: "pending"
      },
      {
        title: "Selesai",
        description: "Dokumen siap untuk diambil atau dikirim",
        date: "-",
        status: "pending"
      }
    ]
  }
];

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!trackingNumber.trim()) {
      setError("Masukkan nomor referensi untuk melacak dokumen.");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const result = mockDocuments.find(doc => doc.id === trackingNumber);
      
      if (result) {
        setTrackingResult(result);
        setError("");
      } else {
        setTrackingResult(null);
        setError("Dokumen dengan nomor referensi tersebut tidak ditemukan. Periksa kembali nomor referensi Anda.");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-green-500/20 text-green-400">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Selesai
          </span>
        );
      case "in-progress":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400">
            <Clock className="w-4 h-4 mr-1" />
            Dalam Proses
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-yellow-500/20 text-yellow-400">
            <AlertCircle className="w-4 h-4 mr-1" />
            Menunggu
          </span>
        );
    }
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="slideUp">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">Tracking Dokumen</h1>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-10">
              Lacak status dokumen administrasi Anda dengan memasukkan nomor referensi.
              Pantau progres pengajuan dokumen Anda secara real-time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tracking Form Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-xl mx-auto bg-dark-card rounded-xl shadow-lg p-8 border border-dark-border">
              <h2 className="text-2xl font-display font-bold mb-6 text-center text-white">Lacak Status Dokumen</h2>
              
              <form onSubmit={handleSearch} className="mb-8">
                <div className="mb-6">
                  <label htmlFor="trackingNumber" className="block text-gray-300 font-medium mb-2">
                    Nomor Referensi
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input 
                      type="text" 
                      id="trackingNumber" 
                      className="w-full border border-dark-border bg-dark-bg text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-fsti-primary focus:border-transparent" 
                      placeholder="Contoh: REF-2025030001"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-red-400 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  fullWidth
                  disabled={isLoading}
                  className="flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                      Mencari...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Lacak Dokumen
                    </>
                  )}
                </Button>
              </form>
              
              <div className="border-t border-dark-border pt-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Cara Melacak Dokumen</h3>
                <ol className="space-y-2">
                  <li className="flex text-gray-300">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-fsti-primary text-white mr-3 text-sm">1</span>
                    <span>Masukkan nomor referensi dokumen yang Anda dapatkan saat pengajuan</span>
                  </li>
                  <li className="flex text-gray-300">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-fsti-primary text-white mr-3 text-sm">2</span>
                    <span>Klik tombol "Lacak Dokumen"</span>
                  </li>
                  <li className="flex text-gray-300">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-fsti-primary text-white mr-3 text-sm">3</span>
                    <span>Sistem akan menampilkan status terkini dari dokumen Anda</span>
                  </li>
                </ol>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Hasil Tracking */}
          <AnimatePresence>
            {trackingResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto mt-12 bg-dark-card rounded-xl shadow-lg p-8 border border-dark-border"
              >
                <div className="mb-6 pb-6 border-b border-dark-border">
                  <h3 className="text-xl font-bold mb-6 text-white">Detail Dokumen</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Nomor Referensi</p>
                      <p className="font-medium text-white">{trackingResult.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Jenis Dokumen</p>
                      <p className="font-medium text-white">{trackingResult.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Tanggal Pengajuan</p>
                      <p className="font-medium text-white">{trackingResult.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Status</p>
                      <div className="font-medium">
                        {getStatusBadge(trackingResult.status)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-6 text-white">Status Pengajuan</h3>
                <div className="timeline-container">
                  {trackingResult.timeline.map((item: any, index: number) => (
                    <div key={index} className="timeline-item">
                      <div className={`timeline-dot ${item.status}`}>
                        {item.status === 'completed' && <CheckCircle2 className="w-5 h-5" />}
                        {item.status === 'active' && <Clock className="w-5 h-5" />}
                        {item.status === 'pending' && <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${
                          item.status === 'pending' ? 'text-gray-500' : 'text-white'
                        }`}>{item.title}</h4>
                        <p className={`${
                          item.status === 'pending' ? 'text-gray-500' : 'text-gray-300'
                        } mb-1`}>{item.description}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                    <h3 className="text-lg font-semibold mb-2 text-white">Bagaimana cara mendapatkan nomor referensi?</h3>
                    <p className="text-gray-300">
                      Nomor referensi akan diberikan secara otomatis setelah Anda mengajukan permohonan dokumen melalui sistem kami. 
                      Nomor ini juga akan dikirimkan ke email yang terdaftar.
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
                    <h3 className="text-lg font-semibold mb-2 text-white">Berapa lama proses pembuatan dokumen?</h3>
                    <p className="text-gray-300">
                      Waktu pemrosesan bervariasi tergantung jenis dokumen. Umumnya berkisar antara 1-5 hari kerja. 
                      Detail waktu pemrosesan untuk setiap jenis dokumen dapat dilihat pada halaman Layanan Administrasi.
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
                    <h3 className="text-lg font-semibold mb-2 text-white">Apakah saya perlu datang ke kampus untuk mengambil dokumen?</h3>
                    <p className="text-gray-300">
                      Beberapa dokumen dapat dikirimkan secara elektronik melalui email, sementara dokumen yang memerlukan 
                      cap basah dan tanda tangan asli perlu diambil langsung di kantor Administrasi FSTI.
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
                      email fsti@itk.ac.id atau datang langsung ke kantor Administrasi FSTI dengan membawa nomor referensi Anda.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Try Example Section */}
      <section className="py-16 bg-gradient-to-b from-dark-bg to-fsti-dark">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-2xl font-display font-bold mb-6 text-white">Coba Contoh Tracking</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Ingin mencoba sistem tracking? Gunakan contoh nomor referensi di bawah ini:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => {
                  setTrackingNumber("REF-2025030001");
                  setError("");
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                variant="outline"
                className="bg-dark-card border-fsti-light hover:bg-fsti-primary hover:border-transparent"
              >
                REF-2025030001
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                onClick={() => {
                  setTrackingNumber("REF-2025030002");
                  setError("");
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                variant="outline"
                className="bg-dark-card border-fsti-light hover:bg-fsti-primary hover:border-transparent"
              >
                REF-2025030002
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                onClick={() => {
                  setTrackingNumber("REF-2025030003");
                  setError("");
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                variant="outline"
                className="bg-dark-card border-fsti-light hover:bg-fsti-primary hover:border-transparent"
              >
                REF-2025030003
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default TrackingPage;