'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Check, X } from 'lucide-react';

interface LocationPermissionModalProps {
  onConfirm: (allowed: boolean) => void;
}

export default function LocationPermissionModal({ onConfirm }: LocationPermissionModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already has a preference saved
    const savedPreference = localStorage.getItem('location-preference');
    if (!savedPreference) {
      // Small delay for a smoother entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (allowed: boolean) => {
    localStorage.setItem('location-preference', allowed ? 'allow' : 'deny');
    window.dispatchEvent(new CustomEvent('location-preference-updated'));
    setIsVisible(false);
    onConfirm(allowed);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300" 
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border shadow-2xl rounded-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl font-bold text-foreground mb-2">Helymeghatározás</h2>
          <p className="text-sm text-muted mb-8 leading-relaxed">
            Szeretnéd, hogy a Kapu1 az IP-címed alapján automatikusan megjelenítse a helyi időjárást?
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={() => handleChoice(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-card-hover text-sm font-medium transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              Nem
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-hover text-sm font-medium transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Engedélyezem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
