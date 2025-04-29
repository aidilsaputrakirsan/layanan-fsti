"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  RotateCw,
  FileText,
  Calendar,
  User,
  Tag,
  GraduationCap,
  FileSignature,
  BookOpen,
  Pencil,
  Briefcase,
  ChevronLeft,
  Download,
  ExternalLink,
  X
} from 'lucide-react';

// Definisi tipe data untuk dokumen
interface TimelineItem {
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'active' | 'pending';
}

interface DocumentDetail {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

interface DocumentFile {
  label: string;
  url: string;
  type: 'upload' | 'feedback';
}

interface StudentDocument {
  id: string;
  sheetName: string;
  type: string;
  title: string;
  requestor: string;
  nim?: string;
  programStudi?: string;
  semester?: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending' | 'rejected';
  statusText?: string;
  currentStep: string;
  totalSteps: number;
  lastUpdate: string;
  timeline: TimelineItem[];

  // File references
  files?: DocumentFile[];  // Student uploaded files
  feedback?: DocumentFile[]; // Admin provided files/feedback
  
  // Possible additional fields depending on doc type
  mitra?: string;
  tujuan?: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  tempatPenelitian?: string;
  filePersetujuan?: string;
  fileSurat?: string;
  keterangan?: string;
  tandaTangan?: string;
  tahunAkademik?: string;
  alasan?: string;
  jumlahSertifikat?: string;
  kegiatan?: string;
  formulir?: string;

  // Additional fields for specific document types
  jenisSurat?: string;
  tujuanSurat?: string;
  alamatMitra?: string;
  judulLaporan?: string;
}

interface ApiResponse {
  success: boolean;
  documents?: StudentDocument[];
  document?: StudentDocument;
  message?: string;
}

// URL Google Apps Script Web App for Student Documents (replace with your real script URL)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQGqsCdcxcE8gbqPYTNt3zvbdfrtCZED7fV1GkwFyplhJtSK59Ga7yx4VOMZRkSw/exec';
// Local CORS proxy
const API_ENDPOINT = '/api/cors-proxy';

const MahasiswaTrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [trackingResult, setTrackingResult] = useState<StudentDocument | null>(null);
  const [searchResults, setSearchResults] = useState<StudentDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [sheets, setSheets] = useState<{id: number, title: string}[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [docTypes, setDocTypes] = useState<string[]>([]);
  
  const { t, language } = useLanguage();
  
  // Fetch document types when component mounts
  useEffect(() => {
    const fetchDocTypes = async () => {
      try {
        setIsLoading(true);
        
        // Use CORS proxy to fetch data
        const response = await fetch(`${API_ENDPOINT}?url=${encodeURIComponent(SCRIPT_URL)}&types=1`);
        
        // Parse the response as JSON
        const data = await response.json() as ApiResponse;
        
        if (data && data.success && data.documents && Array.isArray(data.documents)) {
          // Extract unique doc types
          const uniqueTypes = Array.from(new Set(data.documents.map(doc => doc.type)));
          setDocTypes(uniqueTypes);
          
          // We indicate that minimal data is loaded
          setDataLoaded(true);
        } else {
          const errorMessage = data && data.message ? data.message : 'Invalid response format';
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        console.error('Error fetching document types:', err);
        setError(language === 'en' ? 'Failed to load data. Please try again later.' : 'Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocTypes();
  }, [language]);

  // Memoized getStatusBadge function to avoid recreation on each render
  const getStatusBadge = useCallback((status: 'completed' | 'in-progress' | 'pending' | 'rejected') => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            {t('studentTracking.status.completed')}
          </span>
        );
      case "in-progress":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            <Clock className="w-4 h-4 mr-1" />
            {t('studentTracking.status.inProgress')}
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
            <AlertCircle className="w-4 h-4 mr-1" />
            {t('studentTracking.status.rejected')}
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
            <AlertCircle className="w-4 h-4 mr-1" />
            {t('studentTracking.status.pending')}
          </span>
        );
    }
  }, [t]);

  // Memoized getDocTypeIcon function
  const getDocTypeIcon = useCallback((type: string) => {
    switch (type) {
      case "Surat Akademik":
        return <BookOpen className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Kerja Praktik":
      case "Setelah KP":
        return <Briefcase className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Surat Rekomendasi":
        return <FileSignature className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Legalisasi":
        return <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Dispensasi Perkuliahan":
        return <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Nomor Sertifikat":
        return <GraduationCap className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Perubahan FRS":
        return <Pencil className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Surat Tugas":
        return <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "TTD Dekanat":
        return <FileSignature className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Tanda Terima Berkas TA":
        return <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      default:
        return <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
    }
  }, []);

  // Get document details based on type - memoized
  const getDocumentDetails = useCallback((doc: StudentDocument | null): DocumentDetail[] => {
    if (!doc) return [];
    
    // Bagian informasi umum dokumen
    const commonDetails: DocumentDetail[] = [
      {
        icon: <Tag className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.reference'),
        value: doc.id
      },
      {
        icon: <User className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.student'),
        value: doc.requestor
      },
      {
        icon: <GraduationCap className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.nim'),
        value: doc.nim || "-"
      },
      {
        icon: <BookOpen className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.program'),
        value: doc.programStudi || "-"
      },
      {
        icon: <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.date'),
        value: doc.date
      }
    ];
    
    // Informasi spesifik untuk tiap jenis dokumen
    let additionalDetails: DocumentDetail[] = [];
    
    // Informasi khusus berdasarkan tipe dokumen
    if (doc.type === "Surat Akademik") {
      if (doc.jenisSurat) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.letterType') || "Jenis Surat",
          value: doc.jenisSurat
        });
      }
      if (doc.tujuanSurat) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.letterPurpose') || "Tujuan Surat",
          value: doc.tujuanSurat
        });
      }
      if (doc.keterangan) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.description') || "Keterangan",
          value: doc.keterangan
        });
      }
    } 
    else if (doc.type === "Kerja Praktik") {
      if (doc.mitra) {
        additionalDetails.push({
          icon: <Briefcase className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.partner') || "Mitra",
          value: doc.mitra
        });
      }
      if (doc.alamatMitra) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.partnerAddress') || "Alamat Mitra",
          value: doc.alamatMitra
        });
      }
      if (doc.tanggalMulai) {
        additionalDetails.push({
          icon: <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.startDate') || "Tanggal Mulai",
          value: doc.tanggalMulai
        });
      }
      if (doc.tanggalSelesai) {
        additionalDetails.push({
          icon: <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.endDate') || "Tanggal Selesai",
          value: doc.tanggalSelesai
        });
      }
    }
    else if (doc.type === "Setelah KP") {
      if (doc.mitra) {
        additionalDetails.push({
          icon: <Briefcase className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.status.partner') || "Mitra",
          value: doc.mitra
        });
      }
      if (doc.judulLaporan) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('studentTracking.fields.reportTitle') || "Judul Laporan",
          value: doc.judulLaporan
        });
      }
    }
    // Field generik yang mungkin ada di berbagai tipe dokumen
    if (doc.mitra && doc.type !== "Kerja Praktik" && doc.type !== "Setelah KP") {
      additionalDetails.push({
        icon: <Briefcase className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.partner') || "Mitra",
        value: doc.mitra
      });
    }
    
    if (doc.tujuan) {
      additionalDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.purpose') || "Tujuan",
        value: doc.tujuan
      });
    }
    
    if (doc.alasan) {
      additionalDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.fields.reason') || "Alasan",
        value: doc.alasan
      });
    }
    
    if (doc.kegiatan) {
      additionalDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.fields.activity') || "Kegiatan",
        value: doc.kegiatan
      });
    }
       
    if (doc.files && doc.files.length > 0) {
      doc.files.forEach((file) => {
        let fileUrl = file.url;
        
        // Tambahkan log untuk debugging
        console.log("File URL dari API:", fileUrl);
        
        // Hanya ganti jika bukan URL http DAN berisi .pdf
        if (fileUrl && fileUrl.includes('.pdf') && !fileUrl.startsWith('http')) {
          // PERBAIKAN: Gunakan pendekatan dinamis alih-alih hardcoding banyak URL
          
          // Pendekatan 1: Gunakan URL ke folder Google Drive umum yang berisi semua file
          const folderUrl = "https://drive.google.com/drive/folders/FOLDER_ID_TERPUSAT";
          fileUrl = folderUrl;
          
          // ATAU
          
          // Pendekatan 2: Hanya tampilkan nama file dan pesan kesalahan untuk admin
          console.error(`URL tidak valid untuk file: ${fileUrl}. Ekstraksi hyperlink gagal.`);
          // Jangan ubah fileUrl, biarkan error terjadi agar admin tahu
        }
        
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: file.label,
          value: <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline flex items-center"
          >
            {language === 'en' ? 'View Document' : 'Lihat Dokumen'}
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        });
      });
    }
    
    // 2. File feedback/dari admin
    if (doc.feedback && doc.feedback.length > 0) {
      doc.feedback.forEach((file) => {
        let fileUrl = file.url;
        if (!fileUrl || (fileUrl.indexOf(".pdf") !== -1 && !fileUrl.startsWith("http"))) {
          const folderUrl = "https://drive.google.com/drive/folders/FOLDER_ID_TERPUSAT";
          fileUrl = folderUrl;
        }
        
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: file.label,
          value: <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline flex items-center"
          >
            {language === 'en' ? 'View Document' : 'Lihat Dokumen'}
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        });
      });
    }
    
    // 3. Field spesifik file yang ada di berbagai tipe dokumen
    if (doc.fileSurat) {
      // PERBAIKAN: Sama seperti di atas
      let fileUrl = doc.fileSurat;
      if (!fileUrl || (fileUrl.indexOf(".pdf") !== -1 && !fileUrl.startsWith("http"))) {
        const folderUrl = "https://drive.google.com/drive/folders/FOLDER_ID_TERPUSAT";
        fileUrl = folderUrl;
    }
      
      additionalDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.letterFile') || "File Surat",
        value: <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline flex items-center"
        >
          {language === 'en' ? 'View Document' : 'Lihat Dokumen'}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      });
    }
    
    // Lakukan hal yang sama untuk filePersetujuan dan formulir
    if (doc.filePersetujuan) {
      let fileUrl = doc.filePersetujuan;
      if (!fileUrl || (fileUrl.indexOf(".pdf") !== -1 && !fileUrl.startsWith("http"))) {
        const folderUrl = "https://drive.google.com/drive/folders/FOLDER_ID_TERPUSAT";
        fileUrl = folderUrl;
      }
      
      additionalDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.approvalFile') || "File Persetujuan",
        value: <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline flex items-center"
        >
          {language === 'en' ? 'View Document' : 'Lihat Dokumen'}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      });
    }
    
    if (doc.formulir) {
      let fileUrl = doc.formulir;
      if (!fileUrl || (fileUrl.indexOf(".pdf") !== -1 && !fileUrl.startsWith("http"))) {
        const folderUrl = "https://drive.google.com/drive/folders/FOLDER_ID_TERPUSAT";
        fileUrl = folderUrl;
      }
      
      additionalDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.form') || "Formulir",
        value: <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline flex items-center"
        >
          {language === 'en' ? 'View Document' : 'Lihat Dokumen'}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      });
    }
    
    return [...commonDetails, ...additionalDetails];
  }, [t, language]);

  
  // Handle search for documents
  const handleSearch = async (e: React.FormEvent | null) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setError("");
    setTrackingResult(null);
    setSearchResults([]);
    
    if (!searchQuery.trim()) {
      setError(language === 'en' ? 'Enter NIM to track documents.' : 'Masukkan NIM untuk melacak dokumen.');
      return;
    }

    setIsLoading(true);

    try {
      // Search by NIM via API
      const apiUrl = `${API_ENDPOINT}?url=${encodeURIComponent(SCRIPT_URL)}&nim=${encodeURIComponent(searchQuery)}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json() as ApiResponse;
      
      if (data.success && 'documents' in data && Array.isArray(data.documents)) {
        const docs = data.documents;
        if (docs.length > 0) {
          setSearchResults(docs);
          
          // If only 1 result, display its details directly
          if (docs.length === 1) {
            setTrackingResult(docs[0]);
          }
          setError("");
        } else {
          setSearchResults([]);
          setTrackingResult(null);
          setError(language === 'en' ? 'No documents found for this NIM.' : 'Tidak ada dokumen yang ditemukan untuk NIM tersebut.');
        }
      } else {
        setSearchResults([]);
        setTrackingResult(null);
        setError(language === 'en' ? 'No documents found for this NIM.' : 'Tidak ada dokumen yang ditemukan untuk NIM tersebut.');
      }
    } catch (err: unknown) {
      console.error('Error searching for student document:', err);
      setError(language === 'en' ? 'An error occurred while searching for documents. Please try again.' : 'Terjadi kesalahan saat mencari dokumen. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to view detail of a document
  const handleViewDetail = useCallback((doc: StudentDocument) => {
    setTrackingResult(doc);
    // Scroll to detail view
    setTimeout(() => {
      const detailElement = window.document.getElementById('detail-view');
      if (detailElement) {
        detailElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="slideUp">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">{t('studentTracking.title')}</h1>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-6">
              {t('studentTracking.description')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {docTypes.map((type, index) => (
                <div key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                  {type}
                </div>
              ))}
            </div>

            <Link href="/tracking" className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('studentTracking.backToMain')}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Tracking Form Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-200 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary-50 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary-50 rounded-full blur-2xl"></div>
              
              <h2 className="text-2xl font-display font-bold mb-6 text-center text-gray-800">{t('studentTracking.trackStatus')}</h2>
              
              <form onSubmit={handleSearch} className="mb-8">
                <div className="mb-6">
                  <label htmlFor="searchQuery" className="block text-gray-700 font-medium mb-2">
                    {t('studentTracking.nimLabel')}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input 
                      type="text" 
                      id="searchQuery" 
                      className="w-full border border-gray-200 bg-gray-50 text-gray-800 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                      placeholder={t('studentTracking.nimExample')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-red-600 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  fullWidth
                  disabled={isLoading || !dataLoaded}
                  className="flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                      {t('studentTracking.searching')}
                    </>
                  ) : !dataLoaded ? (
                    <>
                      <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                      {t('studentTracking.loadingData')}
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      {t('studentTracking.tracking')}
                    </>
                  )}
                </Button>
              </form>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('studentTracking.searchInfo')}</h3>
                <p className="text-gray-600 mb-4">{language === 'en' ? 'You can search for documents using:' : 'Anda dapat mencari dokumen menggunakan:'}</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <GraduationCap className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{t('studentTracking.nimLabel')}</span>
                      <p className="text-sm text-gray-500">{language === 'en' ? 'Enter full or partial NIM' : 'Masukkan NIM lengkap atau sebagian'}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
          
         {/* Search Results List */}
          <AnimatePresence>
            {searchResults.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-200 relative overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-6 text-gray-800">{t('studentTracking.searchResults')} ({searchResults.length} {t('studentTracking.documents')})</h3>
                <div className="space-y-4">
                  {searchResults.map((doc, index) => (
                    <div 
                      key={index} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-600 transition cursor-pointer"
                      onClick={() => handleViewDetail(doc)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getDocTypeIcon(doc.type)}
                          <h4 className="font-medium text-gray-800">{doc.title}</h4>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                          {doc.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {doc.requestor}
                          </span>
                          <span className="flex items-center mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {doc.date}
                          </span>
                        </div>
                        <div>{getStatusBadge(doc.status)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detail Tracking */}
          <AnimatePresence>
            {trackingResult && (
              <motion.div
                id="detail-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-200 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary-50 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary-50 rounded-full blur-3xl"></div>
                
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {getDocTypeIcon(trackingResult.type)}
                      <h3 className="text-xl font-bold text-gray-800">{trackingResult.title}</h3>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium">
                      {trackingResult.type}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getDocumentDetails(trackingResult).map((detail, index) => (
                      <div key={index} className="flex items-start">
                        {detail.icon}
                        <div>
                          <p className="text-gray-500 text-sm mb-1">{detail.label}</p>
                          <div className="font-medium text-gray-800">{detail.value}</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-start md:col-span-2">
                      <div className="w-5 h-5 mr-3"></div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">{t('studentTracking.status.status')}</p>
                        <div className="font-medium">
                          {getStatusBadge(trackingResult.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <h3 className="text-xl font-bold mb-6 text-gray-800 mt-6">{t('studentTracking.submissionStatus')}</h3>
                {trackingResult.timeline && trackingResult.timeline.length > 0 ? (
                  <div className="timeline-container relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary-600/80 before:via-primary-400/50 before:to-gray-300/30 space-y-8">
                    {trackingResult.timeline.map((item, index) => (
                      <div key={index} className="timeline-item relative">
                        <div className={`timeline-dot absolute -left-8 flex items-center justify-center w-6 h-6 rounded-full ${
                          item.status === 'completed' ? 'bg-primary-600 text-white' : 
                          item.status === 'active' ? 'bg-blue-500 text-white' : 
                          'bg-gray-100 border border-gray-300 text-gray-500'
                        }`}>
                          {item.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                          {item.status === 'active' && <Clock className="w-4 h-4" />}
                          {item.status === 'pending' && <AlertCircle className="w-4 h-4" />}
                        </div>
                        <div className={`ml-2 p-4 rounded-lg transition-all ${
                          item.status === 'completed' ? 'bg-primary-50 border border-primary-100' : 
                          item.status === 'active' ? 'bg-blue-50 border border-blue-100' : 
                          'bg-gray-50 border border-gray-200'
                        }`}>
                          <h4 className={`text-lg font-semibold ${
                            item.status === 'pending' ? 'text-gray-500' : 'text-gray-800'
                          }`}>{item.title}</h4>
                          <p className={`${
                            item.status === 'pending' ? 'text-gray-500' : 'text-gray-600'
                          } mb-1`}>{item.description}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">{t('studentTracking.timeline')}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">{t('studentTracking.faq.title')}</h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-primary-600 group-hover:text-primary-700 transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('studentTracking.faq.whatTypes.question')}</h3>
                    <p className="text-gray-600">
                      {t('studentTracking.faq.whatTypes.answer')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-primary-600 group-hover:text-primary-700 transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('studentTracking.faq.howToFind.question')}</h3>
                    <p className="text-gray-600">
                      {t('studentTracking.faq.howToFind.answer')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.3}>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-primary-600 group-hover:text-primary-700 transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('studentTracking.faq.processingTime.question')}</h3>
                    <p className="text-gray-600">
                      {t('studentTracking.faq.processingTime.answer')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.4}>
              <div className="bg-white rounded-xl shadow-md p-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-primary-600 group-hover:text-primary-700 transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('studentTracking.faq.statusNotChanging.question')}</h3>
                    <p className="text-gray-600">
                      {t('studentTracking.faq.statusNotChanging.answer')}
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

export default MahasiswaTrackingPage;