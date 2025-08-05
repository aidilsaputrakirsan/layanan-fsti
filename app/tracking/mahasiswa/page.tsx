"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useRouter } from 'next/navigation';
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
  X,
  ClipboardCheck,
  ArrowLeft
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

interface StudentDocument {
  id: string;
  sheetName: string;
  type: string;
  title: string;
  requestor: string;
  nim?: string;
  programStudi?: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending' | 'rejected';
  statusText?: string;
  timeline: TimelineItem[];
  linkSurat?: {
    label: string;
    url: string;
  };
  keterangan?: string;
  
  // Field spesifik untuk dokumen tertentu yang masih dibutuhkan
  mitra?: string;
  alasan?: string;
}

interface ApiResponse {
  success: boolean;
  documents?: StudentDocument[];
  document?: StudentDocument;
  message?: string;
}

// URL Google Apps Script Web App for Student Documents (replace with your real script URL)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwi2IpDjqkEleYQuif0RaV3P-kzDItATbS7AUyfqeI41MtyChDx6QTBKT9jomCOQwFM/exec';
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
  const [showSurveyModal, setShowSurveyModal] = useState(false);
   
  const { t, language } = useLanguage();
  const router = useRouter();
  
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
    
    // Tambahkan link surat jika tersedia
    if (doc.linkSurat && doc.linkSurat.url) {
      commonDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />, 
        label: t('Surat Anda Disini'),
        value: (
          <button
            onClick={() => {
              window.open(doc.linkSurat!.url, '_blank');
              setShowSurveyModal(true);
            }}
            className="text-blue-600 hover:underline flex items-center bg-transparent border-0 p-0"
          >
            {language === 'en' ? 'View Document' : 'Lihat Dokumen'}
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        )
      });
    }
    
    // Tambahkan keterangan jika tersedia
    if (doc.keterangan) {
      commonDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.fields.description') || "Keterangan",
        value: doc.keterangan
      });
    }
    
    // Tambahkan informasi status jika tersedia
    if (doc.statusText) {
      commonDetails.push({
        icon: <ClipboardCheck className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.status'),
        value: doc.statusText
      });
    }
    
    // Informasi spesifik untuk tiap jenis dokumen yang masih dipertahankan
    // (seperti mitra untuk KP, dll)
    if (doc.type === "Kerja Praktik" && doc.mitra) {
      commonDetails.push({
        icon: <Briefcase className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.status.partner') || "Mitra",
        value: doc.mitra
      });
    }
    
    // Jika ada informasi tambahan untuk dokumen ini (misalnya alasan dispensasi)
    if (doc.type === "Dispensasi Perkuliahan" && doc.alasan) {
      commonDetails.push({
        icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('studentTracking.fields.reason') || "Alasan",
        value: doc.alasan
      });
    }
    
    // Return informasi dokumen yang sudah disederhanakan
    return commonDetails;
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
          setTimeout(() => {
              if (docs.length > 1) {
                // Multiple results - scroll to results list
                const resultsElement = document.getElementById('search-results-section');
                if (resultsElement) {
                  resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              } else {
                // Single result - scroll to detail view
                const detailElement = document.getElementById('detail-view');
                if (detailElement) {
                  detailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }, 300); // Delay untuk animasi
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

   // Function to go back to results
   const handleBackToResults = useCallback(() => {
    setTrackingResult(null);
  }, []);

  return (
    <MainLayout>
      {/* Header Section - Lebih kompak dan fokus */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-primary-50 to-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gradient">{t('studentTracking.title')}</h1>
              <p className="text-gray-700 text-lg mb-6">
                {t('studentTracking.description')}
              </p>
              
              <div className="hidden md:flex flex-wrap justify-center gap-2 mb-6">
                {docTypes.slice(0, 6).map((type, index) => (
                  <span key={index} className="px-3 py-1 bg-white shadow-sm border border-gray-100 rounded-full text-sm text-gray-700">
                    {type}
                  </span>
                ))}
                {docTypes.length > 6 && (
                  <span className="px-3 py-1 bg-white shadow-sm border border-gray-100 rounded-full text-sm text-gray-700">
                    +{docTypes.length - 6} {language === 'en' ? 'more' : 'lainnya'}
                  </span>
                )}
              </div>

              <Link href="/tracking" className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t('studentTracking.backToMain')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tracking Form Section - Dioptimalkan dan dibuat lebih intuitif */}
      <section className="py-10 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-100 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary-50 rounded-full blur-2xl opacity-70"></div>
              
              <h2 className="text-xl font-display font-bold mb-4 text-center text-gray-800">{t('studentTracking.trackStatus')}</h2>
              
              <form onSubmit={handleSearch} className="mb-5">
                <div className="mb-4">
                  <label htmlFor="searchQuery" className="block text-gray-700 text-sm font-medium mb-2">
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
              
              <div className="border-t border-gray-100 pt-4">
                <details className="text-sm">
                  <summary className="text-primary-600 cursor-pointer font-medium flex items-center">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Search Tips' : 'Tips Pencarian'}
                  </summary>
                  <div className="mt-3 text-gray-600">
                    <p className="mb-2">{language === 'en' ? 'You can search for documents using:' : 'Anda dapat mencari dokumen menggunakan:'}</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <GraduationCap className="w-4 h-4 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'en' ? 'Enter full or partial NIM' : 'Masukkan NIM lengkap atau sebagian'}</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </AnimatedSection>
          
         {/* Search Results List - UI yang lebih bersih dan mudah dibaca */}
          <AnimatePresence>
            {searchResults.length > 1 && !trackingResult && (
              <motion.div
                id="search-results-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                  {t('studentTracking.searchResults')} ({searchResults.length} {t('studentTracking.documents')})
                </h3>
                <div className="space-y-3">
                  {searchResults.map((doc, index) => (
                    <div 
                      key={index} 
                      className="p-4 border border-gray-100 rounded-lg hover:border-primary-200 hover:bg-primary-50/30 transition cursor-pointer shadow-sm"
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

          {/* Detail Tracking - Card UI yang lebih modern dan rapi */}
          <AnimatePresence>
            {trackingResult && (
              <motion.div
                id="detail-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                {/* Header dengan tombol kembali */}
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 border-b border-gray-100">
                  {searchResults.length > 1 && (
                    <button 
                      onClick={handleBackToResults}
                      className="flex items-center text-sm text-primary-700 hover:text-primary-900 transition-colors mb-3"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'Back to results' : 'Kembali ke hasil'}
                    </button>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getDocTypeIcon(trackingResult.type)}
                      <h3 className="text-xl font-bold text-gray-800">{trackingResult.title}</h3>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-white text-primary-700 text-sm font-medium border border-primary-100">
                      {trackingResult.type}
                    </div>
                  </div>
                </div>
                
                {/* Body content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  
                  {/* Timeline */}
                  <h3 className="text-lg font-bold mb-4 text-gray-800 border-t border-gray-100 pt-6">{t('studentTracking.submissionStatus')}</h3>
                  {trackingResult.timeline && trackingResult.timeline.length > 0 ? (
                    <div className="timeline-container relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary-600/80 before:via-primary-400/50 before:to-gray-300/30 space-y-6">
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
                            <h4 className={`text-base font-semibold ${
                              item.status === 'pending' ? 'text-gray-500' : 'text-gray-800'
                            }`}>{item.title}</h4>
                            <p className={`${
                              item.status === 'pending' ? 'text-gray-500' : 'text-gray-600'
                            } mb-1 text-sm`}>{item.description}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">{t('studentTracking.timeline')}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

         {/* Survey modal prompting navigation */}
          <AnimatePresence>
            {showSurveyModal && (
              <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="bg-white rounded-xl p-6 max-w-md mx-auto relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                  <button className="absolute top-3 right-3" onClick={() => setShowSurveyModal(false)}><X /></button>
                  <h2 className="text-xl font-bold mb-4">
                    {language === 'en' ? '🥺 Help us with a quick survey!' : '🥺 Bantu kami dengan survey singkat!'}
                  </h2>
                  <p className="mb-6">
                    {language === 'en' 
                      ? 'Your feedback means the world to us! It only takes 30 seconds...' 
                      : 'Masukan Anda sangat berharga bagi kami! Hanya butuh 30 detik...'}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => { setShowSurveyModal(false); router.push('/survey-kepuasan'); }}>
                      {language === 'en' ? '❤️ Isi Survey' : '❤️ Isi Survey'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="hover:bg-gray-200 text-gray-500"
                      onClick={() => setShowSurveyModal(false)}
                    >
                      {language === 'en' ? '💔 Break Our Hearts' : '💔 Hancurkan Hati Kami'}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* FAQ Section - Diperbarui dengan tampilan accordion */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-2xl font-display font-bold text-center mb-8 text-gradient">{t('studentTracking.faq.title')}</h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <AnimatedSection animation="slideUp" delay={0.1}>
                <details className="bg-white rounded-xl shadow-sm p-4 group border border-gray-100">
                  <summary className="flex items-center justify-between cursor-pointer font-medium">
                    <div className="flex items-center text-gray-800">
                      <HelpCircle className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{t('studentTracking.faq.whatTypes.question')}</span>
                    </div>
                    <div className="transition group-open:rotate-180">
                      <ChevronLeft className="w-5 h-5 rotate-270 text-gray-500" />
                    </div>
                  </summary>
                  <div className="mt-4 ml-8 text-gray-600">
                    <p>{t('studentTracking.faq.whatTypes.answer')}</p>
                  </div>
                </details>
              </AnimatedSection>
              
              <AnimatedSection animation="slideUp" delay={0.2}>
                <details className="bg-white rounded-xl shadow-sm p-4 group border border-gray-100">
                  <summary className="flex items-center justify-between cursor-pointer font-medium">
                    <div className="flex items-center text-gray-800">
                      <HelpCircle className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{t('studentTracking.faq.howToFind.question')}</span>
                    </div>
                    <div className="transition group-open:rotate-180">
                      <ChevronLeft className="w-5 h-5 rotate-270 text-gray-500" />
                    </div>
                  </summary>
                  <div className="mt-4 ml-8 text-gray-600">
                    <p>{t('studentTracking.faq.howToFind.answer')}</p>
                  </div>
                </details>
              </AnimatedSection>
              
              <AnimatedSection animation="slideUp" delay={0.3}>
                <details className="bg-white rounded-xl shadow-sm p-4 group border border-gray-100">
                  <summary className="flex items-center justify-between cursor-pointer font-medium">
                    <div className="flex items-center text-gray-800">
                      <HelpCircle className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{t('studentTracking.faq.processingTime.question')}</span>
                    </div>
                    <div className="transition group-open:rotate-180">
                      <ChevronLeft className="w-5 h-5 rotate-270 text-gray-500" />
                    </div>
                  </summary>
                  <div className="mt-4 ml-8 text-gray-600">
                    <p>{t('studentTracking.faq.processingTime.answer')}</p>
                  </div>
                </details>
              </AnimatedSection>
              
              <AnimatedSection animation="slideUp" delay={0.4}>
                <details className="bg-white rounded-xl shadow-sm p-4 group border border-gray-100">
                  <summary className="flex items-center justify-between cursor-pointer font-medium">
                    <div className="flex items-center text-gray-800">
                      <HelpCircle className="w-5 h-5 mr-3 text-primary-600" />
                      <span>{t('studentTracking.faq.statusNotChanging.question')}</span>
                    </div>
                    <div className="transition group-open:rotate-180">
                      <ChevronLeft className="w-5 h-5 rotate-270 text-gray-500" />
                    </div>
                  </summary>
                  <div className="mt-4 ml-8 text-gray-600">
                    <p>{t('studentTracking.faq.statusNotChanging.answer')}</p>
                  </div>
                </details>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MahasiswaTrackingPage;