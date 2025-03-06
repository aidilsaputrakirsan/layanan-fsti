"use client";

import { useState } from 'react';

const AnimationTest = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(30);
  const [size, setSize] = useState(400);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-dark-card p-4 rounded-lg shadow-lg text-white">
      <div className="mb-4">
        <h2 className="font-bold text-sm mb-2">Animation Test Panel</h2>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="visibility" 
            checked={isVisible}
            onChange={() => setIsVisible(!isVisible)} 
            className="mr-2"
          />
          <label htmlFor="visibility" className="text-sm">Show Animation</label>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs mb-1">Opacity: {opacity}%</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={opacity} 
          onChange={(e) => setOpacity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-xs mb-1">Size: {size}px</label>
        <input 
          type="range" 
          min="100" 
          max="800" 
          value={size} 
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      {isVisible && (
        <div 
          className="fixed inset-0 -z-5 pointer-events-none"
          style={{ opacity: opacity / 100 }}
        >
          <div 
            className="absolute rounded-full blur-[60px] bg-blue-500 animate-pulse"
            style={{ 
              width: `${size}px`, 
              height: `${size}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AnimationTest;