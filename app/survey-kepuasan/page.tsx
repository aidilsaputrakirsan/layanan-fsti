"use client";

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Send, CheckCircle, AlertCircle, RotateCw, MessageSquare, User, Type, 
  FileText, ThumbsUp, Heart, Award, GraduationCap, Users, DollarSign, Globe, 
  Laptop, FileSignature, Folder, Briefcase, Edit 
} from 'lucide-react';

// URL Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzh_0Qd6yOaMp2f6qJS0xCRYTNgcDJm8YDCZaxretN0JiT4dAChQ1qtQe0kbixvL852_A/exec';

interface SurveyFormData {
  nama: string;
  identitas: string;
  jenisLayanan: string;
  rating: number;
  komentar: string;
  tanggal: string;
  kategori: 'Mahasiswa' | 'Dosen';
}

// Fungsi untuk mendapatkan emoji berdasarkan rating
const getRatingEmoji = (rating: number) => {
  if (rating <= 0) return <span className="text-2xl opacity-50">😶</span>;
  if (rating === 1) return <span className="text-2xl">😫</span>;
  if (rating === 2) return <span className="text-2xl">😔</span>;
  if (rating === 3) return <span className="text-2xl">😐</span>;
  if (rating === 4) return <span className="text-2xl">😊</span>;
  return <span className="text-2xl">🤩</span>;
};

// Fungsi untuk mendapatkan teks rating
const getRatingText = (rating: number, language: 'en' | 'id') => {
  if (rating <= 0) return language === 'en' ? 'Not rated yet' : 'Belum dinilai';
  if (rating === 1) return language === 'en' ? 'Very Disappointed' : 'Sangat Kecewa';
  if (rating === 2) return language === 'en' ? 'Unsatisfied' : 'Tidak Puas';
  if (rating === 3) return language === 'en' ? 'Neutral' : 'Netral';
  if (rating === 4) return language === 'en' ? 'Satisfied' : 'Puas';
  return language === 'en' ? 'Outstanding' : 'Sangat Memuaskan';
};

// Fungsi untuk mendapatkan warna berdasarkan rating
const getRatingColor = (rating: number) => {
  if (rating <= 0) return 'text-gray-400';
  if (rating === 1) return 'text-red-500';
  if (rating === 2) return 'text-orange-500';
  if (rating === 3) return 'text-yellow-500';
  if (rating === 4) return 'text-green-400';
  return 'text-green-600';
};

// Komponen untuk rating
const RatingSelector = ({ rating, onChange, hoverRating, setHoverRating, language }: {
  rating: number;
  onChange: (rating: number) => void;
  hoverRating: number;
  setHoverRating: (rating: number) => void;
  language: 'en' | 'id';
}) => {
  const ratingColors = {
    1: "text-red-500 hover:text-red-600",
    2: "text-orange-400 hover:text-orange-500",
    3: "text-yellow-400 hover:text-yellow-500", 
    4: "text-green-400 hover:text-green-500",
    5: "text-green-500 hover:text-green-600"
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 text-sm flex items-center">
          <span className="mr-1">{language === 'en' ? 'Poor' : 'Buruk'}</span>
          <span className="text-xl">😫</span>
        </span>
        <span className="text-gray-500 text-sm flex items-center">
          <span className="text-xl">🤩</span>
          <span className="ml-1">{language === 'en' ? 'Excellent' : 'Sangat Baik'}</span>
        </span>
      </div>
      
      <div className="flex justify-center space-x-8 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div 
            key={`emoji-${star}`}
            className={`text-2xl transition-opacity duration-200 ${
              (hoverRating === star || (!hoverRating && rating === star)) ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {getRatingEmoji(star)}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-3 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`focus:outline-none p-2 rounded-full transition-colors duration-200 ${
              (hoverRating >= star || (!hoverRating && rating >= star)) ? 
                `bg-gray-100 ${ratingColors[star as 1|2|3|4|5]}` : 'text-gray-300'
            }`}
          >
            <Star
              className={`w-10 h-10 transition-all duration-200 ${
                (hoverRating >= star || (!hoverRating && rating >= star)) ? 'fill-current' : ''
              }`}
            />
          </motion.button>
        ))}
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className={`flex items-center font-medium text-lg ${getRatingColor(hoverRating || rating)}`}>
          {getRatingEmoji(hoverRating || rating)}
          <span className="ml-2 text-lg">
            {getRatingText(hoverRating || rating, language)}
          </span>
        </div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: hoverRating || rating ? `${(hoverRating || rating) * 20}%` : '0%' }}
          transition={{ duration: 0.3 }}
          className="h-1 mt-4 bg-primary-600 rounded-full"
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

// Komponen untuk animasi konfetti
const UseConfetti = () => {
  const [confettiLoaded, setConfettiLoaded] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setConfettiLoaded(true);
      const confetti = (window as any).confetti;
      if (confetti) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#2f4dd3', '#4f46e5', '#5978ff'],
            ticks: 200
          });
        }, 700);
      }
    };

    script.onerror = () => {
      console.error('Failed to load confetti script');
      setConfettiLoaded(false);
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

// Komponen untuk animasi sukses
const SuccessAnimation = ({ onSubmitAnother, language }: { 
  onSubmitAnother: () => void, 
  language: 'en' | 'id' 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-70"></div>
      
      <UseConfetti />
      
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 10 }}
          className="relative"
        >
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="text-6xl">🎉</div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute -top-4 -right-4"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-3xl">👍</div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-4 -left-4"
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-3xl">🏆</div>
          </motion.div>
          
          <motion.div 
            className="absolute -top-2 -left-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="text-3xl">⭐</div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {language === 'en' ? 'Thank You for Your Feedback!' : 'Terima Kasih atas Umpan Balik Anda!'}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === 'en' 
              ? 'Your survey has been successfully submitted. We appreciate your time and feedback.'
              : 'Survey Anda telah berhasil dikirimkan. Kami menghargai waktu dan umpan balik Anda.'}
          </p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={onSubmitAnother}
              variant="primary"
              icon={<MessageSquare className="w-5 h-5" />}
              animate
            >
              {language === 'en' ? 'Submit Another Response' : 'Kirim Tanggapan Lain'}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const SurveyKepuasanPage = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<SurveyFormData>({
    nama: '',
    identitas: '',
    jenisLayanan: '',
    rating: 0,
    komentar: '',
    tanggal: new Date().toISOString(),
    kategori: 'Mahasiswa'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const mahasiswaServices = [
    { id: 'surat', label: language === 'en' ? 'Letter Services' : 'Layanan Surat', icon: <FileText className="w-5 h-5" /> },
    { id: 'kp-ta', label: language === 'en' ? 'Internship / Apprenticeship and Final Projects' : 'Kerja Praktek / Magang dan Tugas Akhir', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'akademik', label: language === 'en' ? 'Academic Services' : 'Layanan Akademik', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'legalisasi', label: language === 'en' ? 'Document Legalization' : 'Legalisasi Dokumen', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'perubahan-matkul', label: language === 'en' ? 'Course Changes/Additions/Removals' : 'Layanan Perubahan/Penambahan/Penghapusan Mata Kuliah', icon: <Edit className="w-5 h-5" /> },
    { id: 'kemahasiswaan', label: language === 'en' ? 'Student Affairs' : 'Layanan Kemahasiswaan', icon: <Users className="w-5 h-5" /> },
    { id: 'keuangan', label: language === 'en' ? 'Financial Services' : 'Layanan Keuangan', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'humas', label: language === 'en' ? 'Public Relations' : 'Layanan Humas', icon: <Globe className="w-5 h-5" /> },
  ];

  const dosenServices = [
    { id: 'sistem-informasi-dosen', label: language === 'en' ? 'Lecturer Information Systems' : 'Sistem Informasi Dosen', icon: <Laptop className="w-5 h-5" /> },
    { id: 'pengajuan-surat-cek-plagiat', label: language === 'en' ? 'Plagiarism Check Letter' : 'Pengajuan Surat Ket. Cek Plagiasi Dosen', icon: <FileText className="w-5 h-5" /> },
    { id: 'template-form-cuti', label: language === 'en' ? 'Leave Form Template' : 'Template Form Cuti', icon: <FileSignature className="w-5 h-5" /> },
    { id: 'layanan-surat-tugas', label: language === 'en' ? 'Assignment Letter Service' : 'Layanan Pengajuan Surat Tugas', icon: <FileText className="w-5 h-5" /> },
    { id: 'peminjaman-sarana', label: language === 'en' ? 'ITK Facilities and Infrastructure Borrowing' : 'Layanan Peminjaman Sarana dan Prasarana ITK', icon: <Laptop className="w-5 h-5" /> },
    { id: 'pengesahan-dekan', label: language === 'en' ? 'Dean\'s Approval' : 'Layanan Pengesahan Dekan', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'inisiasi-kerjasama', label: language === 'en' ? 'Cooperation Initiation' : 'Layanan Pengajuan Inisiasi Kerjasama', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'kumpulan-sk', label: language === 'en' ? 'Academic-Non Academic Decrees Collection' : 'Kumpulan SK Akademik-Non Akademik', icon: <Folder className="w-5 h-5" /> },
    { id: 'template-kp4', label: language === 'en' ? 'KP4 Form Template' : 'Template Form KP4', icon: <FileSignature className="w-5 h-5" /> },
    { id: 'pengajuan-sk-rektor', label: language === 'en' ? 'Rector\'s Decree Request' : 'Layanan Pengajuan SK Rektor', icon: <Award className="w-5 h-5" /> },
  ];

  const determineCategory = (jenisLayanan: string) => {
    if (mahasiswaServices.some(service => service.id === jenisLayanan)) return 'Mahasiswa';
    if (dosenServices.some(service => service.id === jenisLayanan)) return 'Dosen';
    return 'Mahasiswa';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      if (name === 'jenisLayanan') {
        updatedData.kategori = determineCategory(value);
      }
      return updatedData;
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (!formData.nama || !formData.jenisLayanan || formData.rating === 0) {
        throw new Error(language === 'en' ? 'Please fill all required fields' : 'Harap isi semua kolom yang diperlukan');
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors', // Ubah ke 'cors' untuk membaca respons
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submitSurvey', // Tambahkan struktur action
          data: formData
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          nama: '',
          identitas: '',
          jenisLayanan: '',
          rating: 0,
          komentar: '',
          tanggal: new Date().toISOString(),
          kategori: 'Mahasiswa'
        });
      } else {
        throw new Error(result.message || (language === 'en' ? 'Failed to submit survey' : 'Gagal mengirim survey'));
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : String(error));
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
                {language === 'en' ? 'Service Satisfaction Survey' : 'Survey Kepuasan Layanan'}
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                {language === 'en' 
                  ? 'Help us improve our services by providing your feedback and rating your experience.'
                  : 'Bantu kami meningkatkan layanan dengan memberikan umpan balik dan penilaian atas pengalaman Anda.'}
              </p>
              
              <div className="flex justify-center items-center gap-6 mb-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-3xl"
                >
                  👍
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl"
                >
                  ❤️
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-3xl"
                >
                  ⭐
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                  <div className="text-3xl mb-2">✅</div>
                  <h3 className="font-bold">
                    {language === 'en' ? 'Quality Service' : 'Layanan Berkualitas'}
                  </h3>
                </div>
                <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                  <div className="text-3xl mb-2">⏱️</div>
                  <h3 className="font-bold">
                    {language === 'en' ? 'Fast Response' : 'Respon Cepat'}
                  </h3>
                </div>
                <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="font-bold">
                    {language === 'en' ? 'Your Opinion Matters' : 'Pendapat Anda Penting'}
                  </h3>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <SuccessAnimation 
                  onSubmitAnother={() => setSubmitStatus('idle')} 
                  language={language} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                  <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                  
                  <form onSubmit={handleSubmit} className="relative z-10">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 relative">
                      <span className="relative z-10">{language === 'en' ? 'Your Feedback' : 'Umpan Balik Anda'}</span>
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-600 rounded-full"></span>
                    </h2>
                    
                    <AnimatePresence>
                      {submitStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg overflow-hidden"
                        >
                          <div className="flex items-center text-red-700">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <p>{errorMessage || (language === 'en' ? 'An error occurred. Please try again.' : 'Terjadi kesalahan. Silakan coba lagi.')}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="mb-6">
                      <label htmlFor="nama" className="block text-gray-700 font-medium mb-2 flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary-600" />
                        {language === 'en' ? 'Name' : 'Nama'} <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="nama"
                          name="nama"
                          value={formData.nama}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg p-3 pl-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all duration-300"
                          placeholder={language === 'en' ? 'Enter your full name' : 'Masukkan nama lengkap Anda'}
                          required
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5 bg-primary-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: formData.nama ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="identitas" className="block text-gray-700 font-medium mb-2 flex items-center">
                        <Type className="w-5 h-5 mr-2 text-primary-600" />
                        {language === 'en' ? 'Student/Staff ID (NIM/NIP)' : 'NIM/NIP'} 
                        <span className="text-gray-500 text-sm ml-2">({language === 'en' ? 'Optional' : 'Opsional'})</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="identitas"
                          name="identitas"
                          value={formData.identitas}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg p-3 pl-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all duration-300"
                          placeholder={language === 'en' ? 'Enter your ID number' : 'Masukkan nomor identitas Anda'}
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5 bg-primary-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: formData.identitas ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="jenisLayanan" className="block text-gray-700 font-medium mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary-600" />
                        {language === 'en' ? 'Service Type' : 'Jenis Layanan'} <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="jenisLayanan"
                          name="jenisLayanan"
                          value={formData.jenisLayanan}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg p-3 pl-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all duration-300 appearance-none"
                          required
                        >
                          <option value="">
                            {language === 'en' ? '-- Select Service --' : '-- Pilih Layanan --'}
                          </option>
                          <optgroup label={language === 'en' ? 'Student Services' : 'Layanan Mahasiswa'}>
                            {mahasiswaServices.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.label}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label={language === 'en' ? 'Lecturer Services' : 'Layanan Dosen'}>
                            {dosenServices.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.label}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      
                      {formData.jenisLayanan && (
                        <div className="mt-2 flex items-center bg-primary-50 p-2 rounded-md">
                          <span className="text-primary-600 mr-2">
                            {[...mahasiswaServices, ...dosenServices].find(s => s.id === formData.jenisLayanan)?.icon || <FileText className="w-5 h-5" />}
                          </span>
                          <span className="text-sm text-primary-700">
                            {[...mahasiswaServices, ...dosenServices].find(s => s.id === formData.jenisLayanan)?.label || formData.jenisLayanan}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <label className="block text-gray-700 font-medium mb-2 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-primary-600" />
                        {language === 'en' ? 'Satisfaction Rating' : 'Rating Kepuasan'} <span className="text-red-500 ml-1">*</span>
                      </label>
                      <RatingSelector 
                        rating={formData.rating}
                        onChange={handleRatingChange}
                        hoverRating={hoverRating}
                        setHoverRating={setHoverRating}
                        language={language}
                      />
                    </div>
                    
                    <div className="mb-8">
                      <label htmlFor="komentar" className="block text-gray-700 font-medium mb-2 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
                        {language === 'en' ? 'Comments and Suggestions' : 'Komentar dan Saran'}
                        <span className="text-gray-500 text-sm ml-2">({language === 'en' ? 'Optional' : 'Opsional'})</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="komentar"
                          name="komentar"
                          value={formData.komentar}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all duration-300"
                          placeholder={language === 'en' ? 'Share your experience and suggestions for improvement...' : 'Bagikan pengalaman dan saran Anda untuk perbaikan...'}
                        ></textarea>
                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                          {formData.komentar.length}/500
                        </div>
                      </div>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                        className="flex items-center justify-center py-3 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                            {language === 'en' ? 'Submitting...' : 'Mengirim...'}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {language === 'en' ? 'Submit Feedback' : 'Kirim Umpan Balik'}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-md hover-card group border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4 text-3xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  💬
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{language === 'en' ? 'Why Your Feedback Matters' : 'Mengapa Umpan Balik Anda Penting'}</h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'Your feedback helps us improve our services and provide better administrative support for all students and staff.'
                    : 'Umpan balik Anda membantu kami meningkatkan layanan dan memberikan dukungan administrasi yang lebih baik untuk semua mahasiswa dan staf.'}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="bg-white rounded-xl p-6 shadow-md hover-card group border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4 text-3xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  📈
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{language === 'en' ? 'Continuous Improvement' : 'Peningkatan Berkelanjutan'}</h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'We continuously monitor and evaluate feedback to enhance our service quality and customer satisfaction.'
                    : 'Kami terus memantau dan mengevaluasi umpan balik untuk meningkatkan kualitas layanan dan kepuasan pelanggan.'}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.3}>
              <div className="bg-white rounded-xl p-6 shadow-md hover-card group border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4 text-3xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  ❤️
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{language === 'en' ? 'Thank You' : 'Terima Kasih'}</h3>
                <p className="text-gray-600 text-sm">
                  {language === 'en' 
                    ? 'We appreciate your time in completing this survey. Your input will be used to make meaningful improvements.'
                    : 'Kami menghargai waktu Anda dalam mengisi survey ini. Masukan Anda akan digunakan untuk melakukan perbaikan yang berarti.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SurveyKepuasanPage;