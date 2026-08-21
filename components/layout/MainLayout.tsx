"use client";

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  hideBackground?: boolean;
}

const MainLayout = ({ children, hideBackground = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <Navbar />
      {/* Pastikan z-index positif untuk konten */}
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;