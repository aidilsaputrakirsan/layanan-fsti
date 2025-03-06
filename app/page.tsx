import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Fakultas Sains dan Teknologi Informasi
            </h1>
            <h2 className="text-xl md:text-2xl mb-6">
              Institut Teknologi Kalimantan
            </h2>
            <p className="text-blue-200 mb-8 text-lg">
              Melayani kebutuhan administrasi civitas akademika dengan cepat, 
              efisien, dan transparan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/layanan-administrasi" 
                className="bg-white text-blue-900 px-6 py-3 rounded-md font-medium text-center hover:bg-blue-100 transition"
              >
                Lihat Layanan
              </Link>
              <Link 
                href="/tracking" 
                className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium text-center hover:bg-blue-800 transition"
              >
                Tracking Dokumen
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-lg p-3 shadow-lg">
              {/* Placeholder untuk gambar/ilustrasi FSTI */}
              <div className="w-full h-64 md:h-80 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-900 text-xl font-semibold">Ilustrasi FSTI ITK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Populer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan Populer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layanan 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-blue-900" 
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
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Surat Umum</h3>
              <p className="text-gray-600 text-center mb-4">
                Permintaan surat pengantar dan dokumen administratif umum
              </p>
              <div className="text-center">
                <Link 
                  href="/layanan-administrasi#surat-umum" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  <span>Ajukan Sekarang</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Layanan 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-blue-900" 
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
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">KP & Tugas Akhir</h3>
              <p className="text-gray-600 text-center mb-4">
                Layanan dokumen terkait Kerja Praktek dan Tugas Akhir
              </p>
              <div className="text-center">
                <Link 
                  href="/layanan-administrasi#kp-ta" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  <span>Ajukan Sekarang</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Layanan 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-blue-900" 
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
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Legalisasi</h3>
              <p className="text-gray-600 text-center mb-4">
                Layanan legalisasi dokumen akademik resmi fakultas
              </p>
              <div className="text-center">
                <Link 
                  href="/layanan-administrasi#legalisasi" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  <span>Ajukan Sekarang</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Studi Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Program Studi FSTI</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Fakultas Sains dan Teknologi Informasi memiliki 8 Program Studi yang dibagi ke dalam 2 Jurusan
          </p>
          
          {/* Jurusan Sains dan Analitika Data */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8">Jurusan Sains dan Analitika Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Prodi 1 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Fisika</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Penelitian fenomena fisika dan aplikasinya</li>
                  <li>Pengembangan teknologi berbasis ilmu fisika</li>
                  <li>Analisis dan pemodelan sistem fisis</li>
                </ul>
              </div>
              
              {/* Prodi 2 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Matematika</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Penelitian dan pengembangan matematika murni</li>
                  <li>Aplikasi matematika dalam berbagai bidang</li>
                  <li>Pemodelan matematika untuk problem solving</li>
                </ul>
              </div>
              
              {/* Prodi 3 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Statistika</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Analisis data dan metode statistika</li>
                  <li>Pengolahan big data</li>
                  <li>Pemodelan statistika untuk pengambilan keputusan</li>
                </ul>
              </div>
              
              {/* Prodi 4 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Sains Data</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Pengolahan dan analisis big data</li>
                  <li>Machine learning dan AI</li>
                  <li>Data mining dan visualisasi data</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Jurusan TEIB */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">Jurusan Teknik Elektro, Informatika dan Bisnis (TEIB)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Prodi 1 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Teknik Elektro</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Teknologi kelistrikan dan elektronika</li>
                  <li>Sistem kontrol dan otomasi</li>
                  <li>Teknik tenaga listrik</li>
                </ul>
              </div>
              
              {/* Prodi 2 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Sistem Informasi</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Analisis dan desain sistem informasi</li>
                  <li>Manajemen basis data</li>
                  <li>Integrasi sistem dan teknologi informasi</li>
                </ul>
              </div>
              
              {/* Prodi 3 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Informatika</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Pengembangan perangkat lunak</li>
                  <li>Kecerdasan buatan dan machine learning</li>
                  <li>Komputasi dan algoritma</li>
                </ul>
              </div>
              
              {/* Prodi 4 */}
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2">Bisnis Digital</h4>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Transformasi digital bisnis</li>
                  <li>E-commerce dan digital marketing</li>
                  <li>Analisis data bisnis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Visi FSTI</h3>
              <p className="text-gray-700 text-center italic">
                "Pada tahun 2029, FSTI ITK akan menjadi pusat keunggulan akademik dan inovasi, menghasilkan lulusan yang kompeten, adaptif, berdaya saing global, dan karya-karya dalam bidang sains dan teknologi informasi yang berdampak bagi kemajuan Kalimantan dan Indonesia."
              </p>
            </div>
            
            <div className="bg-blue-900 text-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Misi FSTI (PRESTASI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-3">
                    <span className="text-xl font-bold w-8">P-R</span>
                    <h4 className="text-lg font-semibold">Pendidikan Berkualitas dan Riset Inovatif</h4>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-xl font-bold w-8">E-S</span>
                    <h4 className="text-lg font-semibold">Ekosistem Kolaborasi dan Sinergi</h4>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-3">
                    <span className="text-xl font-bold w-8">T-S</span>
                    <h4 className="text-lg font-semibold">Tata Kelola Optimal dan Sistem Layanan Prima</h4>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold w-8">A-I</span>
                    <h4 className="text-lg font-semibold">Aktivasi Potensi dan Internasionalisasi</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Butuh Bantuan?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan terkait layanan administrasi FSTI, 
            jangan ragu untuk menghubungi kami.
          </p>
          <Link 
            href="#kontak" 
            className="bg-blue-900 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-800 transition"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}