
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FounderConsole from '@/components/founder-console';
import { useUser, useFirestore } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user && firestore) {
      const unsub = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        } else {
          setUserProfile(null);
        }
      });
      return () => unsub();
    } else {
      setUserProfile(null);
    }
  }, [user, firestore]);

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
      <Header userProfile={userProfile} />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
      <FounderConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} userProfile={userProfile} />
    </>
  );
}
