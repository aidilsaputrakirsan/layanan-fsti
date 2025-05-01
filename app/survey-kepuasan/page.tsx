// app/survey-kepuasan/page.tsx
"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Star, Send, CheckCircle, AlertCircle, RotateCw } from 'lucide-react';

// Update URL ini dengan Google Apps Script yang sudah dibuat
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuFtZWPoN6gqfRNLvhrFV1BFWXec49juZjivOuTvJTA-Cm6LWstWEyZsJn5JrRMIn2/exec';
const API_ENDPOINT = '/api/cors-proxy';

interface SurveyFormData {
  nama: string;
  identitas: string; // NIM/NIP
  jenisLayanan: string;
  rating: number;
  komentar: string;
  tanggal: string;
}

const SurveyKepuasanPage = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<SurveyFormData>({
    nama: '',
    identitas: '',
    jenisLayanan: '',
    rating: 0,
    komentar: '',
    tanggal: new Date().toISOString(),
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Available services
  const availableServices = [
    { id: 'surat-umum', label: language === 'en' ? 'Cover Letters / General Documents' : 'Surat Pengantar / Dokumen Umum' },
    { id: 'kp-ta', label: language === 'en' ? 'Internship / Final Projects' : 'Kerja Praktek / Tugas Akhir' },
    { id: 'legalisasi', label: language === 'en' ? 'Document Legalization' : 'Legalisasi Dokumen' },
    { id: 'siakad', label: language === 'en' ? 'SIAKAD' : 'SIAKAD' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      // Validate required fields
      if (!formData.nama || !formData.jenisLayanan || formData.rating === 0) {
        throw new Error(language === 'en' ? 'Please fill all required fields' : 'Harap isi semua kolom yang diperlukan');
      }
      
      // Menyiapkan data untuk dikirim ke Google Sheets
      const apiUrl = `${API_ENDPOINT}?url=${encodeURIComponent(SCRIPT_URL)}`;
      
      // Send data to the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submitSurvey',
          data: formData
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          nama: '',
          identitas: '',
          jenisLayanan: '',
          rating: 0,
          komentar: '',
          tanggal: new Date().toISOString(),
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
      {/* Header Section */}
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
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Survey Form Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-200">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {language === 'en' ? 'Thank You for Your Feedback!' : 'Terima Kasih atas Umpan Balik Anda!'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {language === 'en' 
                      ? 'Your survey has been successfully submitted. We appreciate your time and feedback.'
                      : 'Survey Anda telah berhasil dikirimkan. Kami menghargai waktu dan umpan balik Anda.'}
                  </p>
                  <Button 
                    onClick={() => setSubmitStatus('idle')}
                    variant="primary"
                  >
                    {language === 'en' ? 'Submit Another Response' : 'Kirim Tanggapan Lain'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {language === 'en' ? 'Your Feedback' : 'Umpan Balik Anda'}
                  </h2>
                  
                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center text-red-700">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <p>{errorMessage || (language === 'en' ? 'An error occurred. Please try again.' : 'Terjadi kesalahan. Silakan coba lagi.')}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Name Input */}
                  <div className="mb-6">
                    <label htmlFor="nama" className="block text-gray-700 font-medium mb-2">
                      {language === 'en' ? 'Name' : 'Nama'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
                      required
                    />
                  </div>
                  
                  {/* NIM/NIP Input */}
                  <div className="mb-6">
                    <label htmlFor="identitas" className="block text-gray-700 font-medium mb-2">
                      {language === 'en' ? 'Student/Staff ID (NIM/NIP)' : 'NIM/NIP'} 
                      <span className="text-gray-500 text-sm ml-2">({language === 'en' ? 'Optional' : 'Opsional'})</span>
                    </label>
                    <input
                      type="text"
                      id="identitas"
                      name="identitas"
                      value={formData.identitas}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  
                  {/* Service Type Dropdown */}
                  <div className="mb-6">
                    <label htmlFor="jenisLayanan" className="block text-gray-700 font-medium mb-2">
                      {language === 'en' ? 'Service Type' : 'Jenis Layanan'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="jenisLayanan"
                      name="jenisLayanan"
                      value={formData.jenisLayanan}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
                      required
                    >
                      <option value="">
                        {language === 'en' ? '-- Select Service --' : '-- Pilih Layanan --'}
                      </option>
                      {availableServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      {language === 'en' ? 'Satisfaction Rating' : 'Rating Kepuasan'} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              formData.rating >= star
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {language === 'en' ? `Your rating: ${formData.rating} of 5` : `Rating Anda: ${formData.rating} dari 5`}
                    </p>
                  </div>
                  
                  {/* Comments Textarea */}
                  <div className="mb-8">
                    <label htmlFor="komentar" className="block text-gray-700 font-medium mb-2">
                      {language === 'en' ? 'Comments and Suggestions' : 'Komentar dan Saran'}
                      <span className="text-gray-500 text-sm ml-2">({language === 'en' ? 'Optional' : 'Opsional'})</span>
                    </label>
                    <textarea
                      id="komentar"
                      name="komentar"
                      value={formData.komentar}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
                      placeholder={language === 'en' ? 'Share your experience and suggestions for improvement...' : 'Bagikan pengalaman dan saran Anda untuk perbaikan...'}
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    className="flex items-center justify-center"
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
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default SurveyKepuasanPage;