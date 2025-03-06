"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo dan Nama */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
            {/* Placeholder untuk logo ITK, ganti dengan Image ketika ada logo */}
            <span className="text-blue-900 font-bold text-sm">FSTI</span>
          </div>
          <div className="hidden md:block">
            <div className="font-bold text-lg">FSTI ITK</div>
            <div className="text-xs -mt-1">Fakultas Sains dan Teknologi Informasi</div>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-200 transition">
            Beranda
          </Link>
          <Link href="/layanan-administrasi" className="hover:text-blue-200 transition">
            Layanan Administrasi
          </Link>
          <Link href="/tracking" className="hover:text-blue-200 transition">
            Tracking Dokumen
          </Link>
          <Link href="#kontak" className="hover:text-blue-200 transition">
            Kontak
          </Link>
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-3">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              href="/layanan-administrasi" 
              className="hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Layanan Administrasi
            </Link>
            <Link 
              href="/tracking" 
              className="hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Tracking Dokumen
            </Link>
            <Link 
              href="#kontak" 
              className="hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Kontak
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;