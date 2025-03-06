"use client";

import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

// Interface untuk tiap layanan
interface LayananProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: string[];
  requirements: string[];
  estimatedTime: string;
}

// Komponen Card Layanan
const LayananCard = ({ layanan }: { layanan: LayananProps }) => {
  return (
    <div id={layanan.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-blue-900 text-white p-4 flex items-center">
        <div className="mr-4">{layanan.icon}</div>
        <h3 className="text-xl font-semibold">{layanan.title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-6">{layanan.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Persyaratan</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {layanan.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Langkah-langkah</h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              {layanan.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-md">
          <div className="mb-3 sm:mb-0">
            <span className="block text-sm text-gray-500">Estimasi Waktu Proses:</span>
            <span className="font-medium">{layanan.estimatedTime}</span>
          </div>
          <Link 
            href="#" 
            className="bg-blue-900 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition text-center"
          >
            Ajukan Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function LayananAdministrasiPage() {
  // Data layanan
  const layananList: LayananProps[] = [
    {
      id: "surat-umum",
      title: "Surat Pengantar / Dokumen Umum",
      description: "Layanan pembuatan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      ),
      steps: [
        "Isi formulir pengajuan surat pengantar",
        "Unggah dokumen pendukung yang diperlukan",
        "Tunggu proses verifikasi oleh admin",
        "Surat akan diproses dan dapat diambil atau dikirim sesuai ketentuan"
      ],
      requirements: [
        "KTM aktif",
        "Dokumen pendukung sesuai keperluan",
        "Telah melunasi pembayaran UKT semester berjalan"
      ],
      estimatedTime: "2-3 hari kerja"
    },
    {
      id: "kp-ta",
      title: "Kerja Praktek / Magang dan Tugas Akhir",
      description: "Layanan administrasi terkait pengajuan dan pelaksanaan Kerja Praktek, Magang, dan Tugas Akhir.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
      ),
      steps: [
        "Pilih jenis surat yang dibutuhkan (KP/Magang/TA)",
        "Isi data institusi tujuan (untuk KP/Magang)",
        "Unggah dokumen pendukung",
        "Tunggu proses persetujuan",
        "Ambil surat di kantor administrasi FSTI"
      ],
      requirements: [
        "Telah menempuh minimal 100 SKS (untuk KP/Magang)",
        "Telah menempuh minimal 120 SKS (untuk TA)",
        "KTM aktif",
        "Transkrip nilai terbaru",
        "Telah melunasi pembayaran UKT semester berjalan"
      ],
      estimatedTime: "3-5 hari kerja"
    },
    {
      id: "legalisasi",
      title: "Legalisasi Dokumen",
      description: "Layanan legalisasi untuk dokumen akademik resmi fakultas seperti transkrip, ijazah, dan sertifikat.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      ),
      steps: [
        "Isi formulir pengajuan legalisasi",
        "Unggah dokumen yang akan dilegalisir",
        "Bayar biaya legalisasi sesuai ketentuan",
        "Tunggu proses legalisasi",
        "Ambil dokumen yang telah dilegalisir"
      ],
      requirements: [
        "KTP/KTM",
        "Dokumen asli yang akan dilegalisir",
        "Fotokopi dokumen yang akan dilegalisir",
        "Bukti pembayaran biaya legalisasi"
      ],
      estimatedTime: "1-2 hari kerja"
    },
    {
      id: "perubahan-mk",
      title: "Perubahan Mata Kuliah",
      description: "Layanan untuk perubahan, penambahan, atau penghapusan mata kuliah dalam rencana studi.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      ),
      steps: [
        "Konsultasi dengan dosen wali",
        "Isi formulir perubahan mata kuliah",
        "Dapatkan persetujuan dari dosen wali",
        "Serahkan formulir ke admin fakultas",
        "Tunggu proses perubahan di SIAKAD"
      ],
      requirements: [
        "KTM aktif",
        "Bukti KRS semester berjalan",
        "Surat persetujuan dosen wali",
        "Masih dalam periode perubahan mata kuliah"
      ],
      estimatedTime: "1-3 hari kerja"
    },
    {
      id: "beasiswa",
      title: "Surat Rekomendasi / Beasiswa",
      description: "Layanan pembuatan surat rekomendasi untuk keperluan aplikasi beasiswa dan kegiatan akademik lainnya.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      ),
      steps: [
        "Isi formulir pengajuan surat rekomendasi",
        "Unggah dokumen pendukung sesuai ketentuan",
        "Tunggu proses persetujuan dari pejabat berwenang",
        "Ambil surat rekomendasi di kantor administrasi FSTI"
      ],
      requirements: [
        "KTM aktif",
        "Transkrip nilai terbaru",
        "CV atau portofolio",
        "Dokumen pendukung lainnya sesuai ketentuan beasiswa"
      ],
      estimatedTime: "3-5 hari kerja"
    },
    {
      id: "layanan-kemahasiswaan",
      title: "Layanan Kemahasiswaan",
      description: "Layanan terkait kegiatan kemahasiswaan seperti UKM, kepanitiaan, dan kompetisi.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
      ),
      steps: [
        "Pilih jenis layanan kemahasiswaan",
        "Isi formulir pengajuan sesuai kebutuhan",
        "Unggah dokumen pendukung",
        "Tunggu proses persetujuan",
        "Terima notifikasi hasil pengajuan"
      ],
      requirements: [
        "KTM aktif",
        "Proposal kegiatan (untuk kepanitiaan/kompetisi)",
        "Surat pengantar dari organisasi terkait",
        "Dokumen pendukung lainnya sesuai keperluan"
      ],
      estimatedTime: "3-7 hari kerja"
    }
  ];

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Layanan Administrasi FSTI</h1>
          <p className="text-blue-200 max-w-3xl mx-auto text-lg">
            Berikut adalah daftar layanan administrasi yang tersedia di Fakultas Sains dan Teknologi Informasi.
            Silakan pilih layanan yang Anda butuhkan.
          </p>
        </div>
      </section>

      {/* Alur Kerja Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Alur Kerja Administrasi</h2>
          
          <div className="flex flex-wrap justify-center">
            {/* Step 1 */}
            <div className="w-full md:w-1/6 px-4 mb-6 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">1</div>
                <h3 className="font-semibold mb-2">Pengajuan</h3>
                <p className="text-gray-600 text-sm">Isi formulir dan unggah berkas</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="w-full md:w-1/6 px-4 mb-6 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">2</div>
                <h3 className="font-semibold mb-2">Verifikasi</h3>
                <p className="text-gray-600 text-sm">Pemeriksaan kelengkapan dokumen</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="w-full md:w-1/6 px-4 mb-6 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">3</div>
                <h3 className="font-semibold mb-2">Proses</h3>
                <p className="text-gray-600 text-sm">Pengerjaan oleh admin fakultas</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="w-full md:w-1/6 px-4 mb-6 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">4</div>
                <h3 className="font-semibold mb-2">Pengesahan</h3>
                <p className="text-gray-600 text-sm">Tanda tangan dan stempel resmi</p>
              </div>
            </div>
            {/* Step 5 */}
            <div className="w-full md:w-1/6 px-4 mb-6 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">5</div>
                <h3 className="font-semibold mb-2">Distribusi</h3>
                <p className="text-gray-600 text-sm">Pengambilan atau pengiriman dokumen</p>
              </div>
            </div>
            {/* Step 6 */}
            <div className="w-full md:w-1/6 px-4">
              <div className="bg-white rounded-lg shadow-md p-4 text-center h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">6</div>
                <h3 className="font-semibold mb-2">Arsip</h3>
                <p className="text-gray-600 text-sm">Penyimpanan salinan dokumen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Layanan Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Daftar Layanan</h2>
          
          <div className="max-w-4xl mx-auto">
            {layananList.map((layanan) => (
              <LayananCard key={layanan.id} layanan={layanan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Butuh Bantuan?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan dalam proses administrasi, 
            jangan ragu untuk menghubungi kami.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="mailto:fsti@itk.ac.id" 
              className="bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
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
              </svg>
              Email Kami
            </a>
            <Link 
              href="#kontak" 
              className="bg-white text-blue-900 border-2 border-blue-900 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
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
              </svg>
              Kontak Kami
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}