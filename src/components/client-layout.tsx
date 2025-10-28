
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FounderConsole from '@/components/founder-console';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  
  const userProfileRef = (user && firestore) ? doc(firestore, "users", user.uid) : null;
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        if (userProfile?.isFounder) {
          setIsConsoleOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userProfile?.isFounder]);

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
      <FounderConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} userProfile={userProfile} />
    </>
  );
}
