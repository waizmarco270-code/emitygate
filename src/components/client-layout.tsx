
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FounderConsole from '@/components/founder-console';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        setIsConsoleOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
      <FounderConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />
    </>
  );
}
