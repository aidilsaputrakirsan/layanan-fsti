"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function TrackingPage() {
  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tracking Dokumen</h1>
          <p className="text-blue-200 max-w-3xl mx-auto text-lg">
            Lacak status dokumen administrasi Anda dengan memasukkan nomor referensi.
          </p>
        </div>
      </section>

      {/* Tracking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Lacak Status Dokumen</h2>
            
            <form className="mb-8">
              <div className="mb-6">
                <label htmlFor="trackingNumber" className="block text-gray-700 font-medium mb-2">
                  Nomor Referensi
                </label>
                <input 
                  type="text" 
                  id="trackingNumber" 
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Masukkan nomor referensi dokumen"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition"
              >
                Lacak Dokumen
              </button>
            </form>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Cara Melacak Dokumen</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Masukkan nomor referensi dokumen yang Anda dapatkan saat pengajuan</li>
                <li>Klik tombol "Lacak Dokumen"</li>
                <li>Sistem akan menampilkan status terkini dari dokumen Anda</li>
              </ol>
            </div>
          </div>
          
          {/* Berikut ini adalah contoh tampilan hasil tracking (akan diganti dengan data dinamis) */}
          <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-md p-8 hidden">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-bold mb-2">Detail Dokumen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Nomor Referensi</p>
                  <p className="font-medium">REF-2023010001</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Jenis Dokumen</p>
                  <p className="font-medium">Surat Pengantar KP</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Tanggal Pengajuan</p>
                  <p className="font-medium">12 Januari 2023</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-medium text-green-600">Sedang Diproses</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Status Pengajuan</h3>
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
              
              {/* Status 1 */}
              <div className="relative flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold">Pengajuan Diterima</h4>
                  <p className="text-gray-600 mb-1">Dokumen telah diterima dan sedang diverifikasi</p>
                  <p className="text-sm text-gray-500">12 Januari 2023, 09:30 WIB</p>
                </div>
              </div>
              
              {/* Status 2 */}
              <div className="relative flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold">Verifikasi Selesai</h4>
                  <p className="text-gray-600 mb-1">Dokumen telah diverifikasi dan sedang diproses</p>
                  <p className="text-sm text-gray-500">12 Januari 2023, 14:45 WIB</p>
                </div>
              </div>
              
              {/* Status 3 */}
              <div className="relative flex items-start mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold">Dalam Proses</h4>
                  <p className="text-gray-600 mb-1">Dokumen sedang dalam proses pengesahan</p>
                  <p className="text-sm text-gray-500">13 Januari 2023, 10:15 WIB</p>
                </div>
              </div>
              
              {/* Status 4 */}
              <div className="relative flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold text-gray-500">Selesai</h4>
                  <p className="text-gray-500 mb-1">Dokumen siap untuk diambil atau dikirim</p>
                  <p className="text-sm text-gray-500">-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Pertanyaan Umum</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">Bagaimana cara mendapatkan nomor referensi?</h3>
              <p className="text-gray-700">
                Nomor referensi akan diberikan secara otomatis setelah Anda mengajukan permohonan dokumen melalui sistem kami. 
                Nomor ini juga akan dikirimkan ke email yang terdaftar.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">Berapa lama proses pembuatan dokumen?</h3>
              <p className="text-gray-700">
                Waktu pemrosesan bervariasi tergantung jenis dokumen. Umumnya berkisar antara 1-5 hari kerja. 
                Detail waktu pemrosesan untuk setiap jenis dokumen dapat dilihat pada halaman Layanan Administrasi.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">Apakah saya perlu datang ke kampus untuk mengambil dokumen?</h3>
              <p className="text-gray-700">
                Beberapa dokumen dapat dikirimkan secara elektronik melalui email, sementara dokumen yang memerlukan 
                cap basah dan tanda tangan asli perlu diambil langsung di kantor Administrasi FSTI.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Apa yang harus dilakukan jika status dokumen tidak berubah?</h3>
              <p className="text-gray-700">
                Jika status dokumen Anda tidak berubah selama lebih dari 3 hari kerja, silakan hubungi kami melalui 
                email fsti@itk.ac.id atau datang langsung ke kantor Administrasi FSTI dengan membawa nomor referensi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}