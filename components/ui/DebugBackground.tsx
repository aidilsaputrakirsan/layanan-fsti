"use client";

import { useState } from 'react';

const DebugBackground = () => {
  const [opacity, setOpacity] = useState(0.25);
  const [blur, setBlur] = useState(60);
  const [size, setSize] = useState(400);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-dark-card p-4 rounded-lg shadow-lg border border-dark-border">
      <h3 className="text-sm font-bold mb-2">Background Debug</h3>
      
      <div className="mb-2">
        <label className="text-xs block mb-1">Opacity: {opacity}</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={opacity}
          onChange={(e) => {
            setOpacity(parseFloat(e.target.value));
            document.documentElement.style.setProperty('--debug-opacity', e.target.value);
          }}
          className="w-full"
        />
      </div>
      
      <div className="mb-2">
        <label className="text-xs block mb-1">Blur: {blur}px</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={blur}
          onChange={(e) => {
            setBlur(parseInt(e.target.value));
            document.documentElement.style.setProperty('--debug-blur', `${e.target.value}px`);
          }}
          className="w-full"
        />
      </div>
      
      <div className="mb-2">
        <label className="text-xs block mb-1">Size: {size}px</label>
        <input 
          type="range" 
          min="100" 
          max="800" 
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
            document.documentElement.style.setProperty('--debug-size', `${e.target.value}px`);
          }}
          className="w-full"
        />
      </div>
      
      <style jsx global>{`
        .gradient-sphere {
          opacity: var(--debug-opacity, ${opacity}) !important;
          filter: blur(var(--debug-blur, ${blur}px)) !important;
        }
        .sphere-1, .sphere-2, .sphere-3, .sphere-4, .sphere-5 {
          width: var(--debug-size, ${size}px) !important;
          height: var(--debug-size, ${size}px) !important;
        }
      `}</style>
    </div>
  );
};

export default DebugBackground;