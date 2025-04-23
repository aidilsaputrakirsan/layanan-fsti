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
  Bookmark,
  FileSignature,
  Building,
  MapPin,
  Award,
  Box,
  ClipboardList,
  ChevronLeft
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

interface FacultyDocument {
  id: string;
  sheetName: string;
  type: string;
  title: string;
  requestor: string;
  nip?: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  statusText?: string;
  currentStep: string;
  totalSteps: number;
  lastUpdate: string;
  timeline: TimelineItem[];
  
  // Possible additional fields depending on doc type
  penyelenggara?: string;
  tanggalKegiatan?: string;
  tempat?: string;
  kehadiranSebagai?: string;
  jenisDokumen?: string;
  fileDokumen?: string;
  fileSudahSah?: string;
  sarana?: string;
  kuantitas?: string;
  tanggalAwal?: string;
  tanggalAkhir?: string;
}

interface SheetInfo {
  id: number;
  title: string;
}

interface ApiResponse {
  success: boolean;
  documents?: FacultyDocument[];
  document?: FacultyDocument;
  message?: string;
}

// URL Google Apps Script Web App for Faculty Documents
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvFO_vWdvVi68vNiyCB4D984Vc3s37yiOEmbUBVYoJ4B-J4c8vFnLkxWqbUmxdWvLp/exec';
// Local CORS proxy
const API_ENDPOINT = '/api/cors-proxy';

const DosenTrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"nama" | "nip">("nama");
  const [trackingResult, setTrackingResult] = useState<FacultyDocument | null>(null);
  const [searchResults, setSearchResults] = useState<FacultyDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [sheets, setSheets] = useState<SheetInfo[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [allDocuments, setAllDocuments] = useState<FacultyDocument[]>([]);
  const [docTypes, setDocTypes] = useState<string[]>([]);
  
  const { t, language } = useLanguage();
  
  // Fetch all documents when component mounts
  useEffect(() => {
    fetchAllDocuments();
  }, []);

  // Function to fetch all documents
  const fetchAllDocuments = async () => {
    try {
      setIsLoading(true);
      
      // Use CORS proxy to fetch data
      const response = await fetch(`${API_ENDPOINT}?url=${encodeURIComponent(SCRIPT_URL)}`);
      
      // Parse the response as JSON
      const data = await response.json() as ApiResponse;
      
      if (data && data.success && data.documents && Array.isArray(data.documents)) {
        setAllDocuments(data.documents);
        
        // Extract unique doc types and sheet names
        const uniqueTypes = Array.from(new Set(data.documents.map(doc => doc.type)));
        const uniqueSheets = Array.from(new Set(data.documents.map(doc => doc.sheetName)));
        
        setDocTypes(uniqueTypes);
        setSheets(uniqueSheets.map((title, index) => ({ id: index, title })));
        
        setDataLoaded(true);
      } else {
        const errorMessage = data && data.message ? data.message : 'Invalid response format';
        throw new Error(errorMessage);
      }
    } catch (err: unknown) {
      console.error('Error fetching documents:', err);
      setError(language === 'en' ? 'Failed to load data. Please try again later.' : 'Gagal memuat data. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search for documents
  const handleSearch = async (e: React.FormEvent | null) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setError("");
    setTrackingResult(null);
    setSearchResults([]);
    
    if (!searchQuery.trim()) {
      setError(searchType === 'nama' 
        ? (language === 'en' ? 'Enter name to track documents.' : 'Masukkan nama untuk melacak dokumen.')
        : (language === 'en' ? 'Enter NIP to track documents.' : 'Masukkan NIP untuk melacak dokumen.')
      );
      return;
    }

    setIsLoading(true);

    try {
      // Local search first (for better performance)
      let localResults: FacultyDocument[] = [];
      
      if (searchType === 'nama') {
        // Search by name (case insensitive)
        const query = searchQuery.toLowerCase();
        localResults = allDocuments.filter(doc => 
          doc.requestor && typeof doc.requestor === 'string' && doc.requestor.toLowerCase().includes(query)
        );
      } else if (searchType === 'nip') {
        // Search by NIP (partial match)
        localResults = allDocuments.filter(doc => 
          doc.nip && doc.nip.toString().includes(searchQuery)
        );
      }
      
      if (localResults.length > 0) {
        setSearchResults(localResults);
        // If only 1 result, display its details directly
        if (localResults.length === 1) {
          setTrackingResult(localResults[0]);
        }
        setError("");
      } else {
        // If not found locally, try to search via API
        const queryParam = searchType === 'nama' ? 'nama' : 'nip';
        const apiUrl = `${API_ENDPOINT}?url=${encodeURIComponent(SCRIPT_URL)}&${queryParam}=${encodeURIComponent(searchQuery)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json() as ApiResponse;
        
        if (data.success && data.documents && Array.isArray(data.documents)) {
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
            setError(language === 'en' 
              ? `No documents found for this ${searchType === 'nama' ? 'name' : 'NIP'}.`
              : `Tidak ada dokumen yang ditemukan untuk ${searchType === 'nama' ? 'nama' : 'NIP'} tersebut.`
            );
          }
        } else {
          setSearchResults([]);
          setTrackingResult(null);
          setError(language === 'en' 
            ? `No documents found for this ${searchType === 'nama' ? 'name' : 'NIP'}.`
            : `Tidak ada dokumen yang ditemukan untuk ${searchType === 'nama' ? 'nama' : 'NIP'} tersebut.`
          );
        }
      }
    } catch (err: unknown) {
      console.error('Error searching for document:', err);
      setError(language === 'en' 
        ? "An error occurred while searching for documents. Please try again."
        : "Terjadi kesalahan saat mencari dokumen. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to view detail of a document
  const handleViewDetail = (doc: FacultyDocument) => {
    setTrackingResult(doc);
    // Scroll to detail view
    setTimeout(() => {
      const detailElement = window.document.getElementById('detail-view');
      if (detailElement) {
        detailElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Get status badge styling
  const getStatusBadge = useCallback((status: 'completed' | 'in-progress' | 'pending') => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            {t('lecturerTracking.status.completed')}
          </span>
        );
      case "in-progress":
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            <Clock className="w-4 h-4 mr-1" />
            {t('lecturerTracking.status.inProgress')}
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
            <AlertCircle className="w-4 h-4 mr-1" />
            {t('lecturerTracking.status.pending')}
          </span>
        );
    }
  }, [t]);

  // Get document type icon
  const getDocTypeIcon = useCallback((type: string) => {
    switch (type) {
      case "Surat Tugas":
        return <FileSignature className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Pengesahan TTD Dekanat":
        return <Bookmark className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      case "Peminjaman Sarpras":
        return <Box className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
      default:
        return <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />;
    }
  }, []);

  // Get document details based on type
  const getDocumentDetails = useCallback((doc: FacultyDocument | null): DocumentDetail[] => {
    if (!doc) return [];
    
    const commonDetails: DocumentDetail[] = [
      {
        icon: <Tag className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('lecturerTracking.status.reference'),
        value: doc.id
      },
      {
        icon: <User className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('lecturerTracking.status.applicant'),
        value: doc.requestor
      },
      {
        icon: <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
        label: t('lecturerTracking.status.submissionDate'),
        value: doc.date
      }
    ];
    
    // Add type-specific details
    let additionalDetails: DocumentDetail[] = [];
    
    if (doc.type === "Surat Tugas") {
      additionalDetails = [
        {
          icon: <Building className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.organizer'),
          value: doc.penyelenggara || (language === 'en' ? "Not available" : "Tidak tersedia")
        },
        {
          icon: <MapPin className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.venue'),
          value: doc.tempat || (language === 'en' ? "Not available" : "Tidak tersedia")
        },
        {
          icon: <Award className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.attendance'),
          value: doc.kehadiranSebagai || (language === 'en' ? "Not available" : "Tidak tersedia")
        }
      ];

      if (doc.fileDokumen) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.supportingDoc'),
          value: <a href={doc.fileDokumen} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('lecturerTracking.status.viewDoc')}</a>
        });
      }
    } else if (doc.type === "Pengesahan TTD Dekanat") {
      additionalDetails = [
        {
          icon: <ClipboardList className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.docType'),
          value: doc.jenisDokumen || (language === 'en' ? "Document" : "Dokumen")
        }
      ];
      
      // Add file dokumen link if available
      if (doc.fileSudahSah) {
        additionalDetails.push({
          icon: <FileText className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.resultDoc'),
          value: <a href={doc.fileSudahSah} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t('lecturerTracking.status.viewDoc')}</a>
        });
      }
    } else if (doc.type === "Peminjaman Sarpras") {
      additionalDetails = [
        {
          icon: <Box className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.facility'),
          value: doc.sarana || (language === 'en' ? "Not available" : "Tidak tersedia")
        },
        {
          icon: <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-1" />,
          label: t('lecturerTracking.status.usageDate'),
          value: `${doc.tanggalAwal || "?"} ${language === 'en' ? "to" : "s/d"} ${doc.tanggalAkhir || "?"}`
        }
      ];
    }
    
    return [...commonDetails, ...additionalDetails];
  }, [t, language]);

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="slideUp">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">{t('lecturerTracking.title')}</h1>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-6">
              {t('lecturerTracking.description')}
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
              {t('lecturerTracking.backToMain')}
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
              
              <h2 className="text-2xl font-display font-bold mb-6 text-center text-gray-800">{t('lecturerTracking.trackStatus')}</h2>
              
              <form onSubmit={handleSearch} className="mb-8">
                <div className="mb-6">
                  <div className="flex space-x-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setSearchType('nama')}
                      className={`flex-1 py-2 px-4 rounded-lg transition ${
                        searchType === 'nama' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-50 border border-gray-200 text-gray-700'
                      }`}
                    >
                      {t('lecturerTracking.searchByName')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchType('nip')}
                      className={`flex-1 py-2 px-4 rounded-lg transition ${
                        searchType === 'nip' 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-50 border border-gray-200 text-gray-700'
                      }`}
                    >
                      {t('lecturerTracking.searchByNip')}
                    </button>
                  </div>
                  
                  <label htmlFor="searchQuery" className="block text-gray-700 font-medium mb-2">
                    {searchType === 'nama' ? t('lecturerTracking.nameLabel') : t('lecturerTracking.nipLabel')}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input 
                      type="text" 
                      id="searchQuery" 
                      className="w-full border border-gray-200 bg-gray-50 text-gray-800 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent" 
                      placeholder={searchType === 'nama' ? t('lecturerTracking.nameExample') : t('lecturerTracking.nipExample')}
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
                      {t('lecturerTracking.searching')}
                    </>
                  ) : !dataLoaded ? (
                    <>
                      <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                      {t('lecturerTracking.loadingData')}
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      {t('lecturerTracking.tracking')}
                    </>
                  )}
                </Button>
              </form>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('lecturerTracking.searchInfo')}</h3>
                <p className="text-gray-600 mb-4">{language === 'en' ? 'You can search for documents by:' : 'Anda dapat mencari dokumen berdasarkan:'}</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <User className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{t('lecturerTracking.nameLabel')}</span>
                      <p className="text-sm text-gray-500">{language === 'en' ? 'Enter full name or part of the name' : 'Masukkan nama lengkap atau sebagian nama'}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{t('lecturerTracking.nipLabel')}</span>
                      <p className="text-sm text-gray-500">{language === 'en' ? 'Enter full or partial NIP/NIPPPK/NIPH number' : 'Masukkan nomor NIP/NIPPPK/NIPH lengkap atau sebagian'}</p>
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
                <h3 className="text-xl font-bold mb-6 text-gray-800">{t('lecturerTracking.searchResults')} ({searchResults.length} {t('lecturerTracking.documents')})</h3>
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
                        <p className="text-gray-500 text-sm mb-1">{t('lecturerTracking.status.status')}</p>
                        <div className="font-medium">
                          {getStatusBadge(trackingResult.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-6 text-gray-800">{t('lecturerTracking.submissionStatus')}</h3>
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
                  <p className="text-gray-500">{t('lecturerTracking.timeline')}</p>
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
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">{t('lecturerTracking.faq.title')}</h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover-card group">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-primary-600 group-hover:text-primary-700 transition-colors">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('lecturerTracking.faq.whatTypes.question')}</h3>
                    <p className="text-gray-600">
                      {t('lecturerTracking.faq.whatTypes.answer')}
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
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('lecturerTracking.faq.howToFind.question')}</h3>
                    <p className="text-gray-600">
                      {t('lecturerTracking.faq.howToFind.answer')}
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
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('lecturerTracking.faq.processingTime.question')}</h3>
                    <p className="text-gray-600">
                      {t('lecturerTracking.faq.processingTime.answer')}
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
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('lecturerTracking.faq.statusNotChanging.question')}</h3>
                    <p className="text-gray-600">
                      {t('lecturerTracking.faq.statusNotChanging.answer')}
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

export default DosenTrackingPage;