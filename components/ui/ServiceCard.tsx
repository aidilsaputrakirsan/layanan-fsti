import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps?: string[];
  requirements?: string[];
  estimatedTime?: string;
  url?: string;
  compact?: boolean;
}

const ServiceCard = ({
  id,
  title,
  description,
  icon,
  steps,
  requirements,
  estimatedTime,
  url,
  compact = false
}: ServiceCardProps) => {
  if (compact) {
    return (
      <motion.div
        className="bg-dark-card rounded-xl overflow-hidden service-card"
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="p-6">
          <div className="w-14 h-14 bg-dark-bg rounded-full flex items-center justify-center mb-5 mx-auto service-icon">
            <div className="text-fsti-light text-2xl">{icon}</div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2 text-white">{title}</h3>
          <p className="text-gray-400 text-center text-sm mb-5">{description}</p>
          <div className="text-center">
            <Link 
              href={url || `/layanan-administrasi#${id}`} 
              className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium group"
            >
              <span>Ajukan Sekarang</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
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
      </motion.div>
    );
  }

  return (
    <div id={id} className="bg-dark-card rounded-xl shadow-lg overflow-hidden hover-card mb-10">
      <div className="bg-fsti-primary text-white p-5 flex items-center">
        <div className="mr-4 service-icon text-2xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-6">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {requirements && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Persyaratan</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="pl-2">
                    <span className="text-fsti-light">•</span> 
                    <span className="ml-2">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {steps && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Langkah-langkah</h4>
              <ol className="text-gray-300 space-y-2">
                {steps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="text-fsti-light font-bold mr-2">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-dark-bg p-5 rounded-xl">
          <div className="mb-4 sm:mb-0">
            <span className="block text-sm text-gray-400">Estimasi Waktu Proses:</span>
            <span className="font-medium text-white">{estimatedTime}</span>
          </div>
          <Link 
            href={url || "#"} 
            className="bg-fsti-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-fsti-secondary transition text-center flex items-center justify-center group"
          >
            <span>Ajukan Sekarang</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;