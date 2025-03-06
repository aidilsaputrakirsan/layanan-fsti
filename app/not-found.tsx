"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <div className="relative mb-8">
            <h1 className="text-9xl font-display font-bold text-fsti-primary opacity-20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-display font-bold text-white">Halaman Tidak Ditemukan</h2>
            </div>
          </div>
          
          <p className="text-gray-400 mb-12">
            Halaman yang Anda cari tidak dapat ditemukan. Halaman tersebut mungkin telah dipindahkan, 
            dihapus, atau URL yang Anda masukkan salah.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/" variant="primary" icon={<Home className="w-5 h-5" />} animate>
              Kembali ke Beranda
            </Button>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline" 
              icon={<ArrowLeft className="w-5 h-5" />}
              animate
            >
              Kembali ke Halaman Sebelumnya
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}