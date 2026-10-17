import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
      Lewati ke konten
    </a>
    <Navbar />
    <main id="konten" className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
