
'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}
