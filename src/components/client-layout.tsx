
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FounderConsole from '@/components/founder-console';
import { useUser, useFirestore, FirebaseClientProvider } from '@/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import type { User } from 'firebase/auth';

const createUserProfile = async (firestore: any, user: User) => {
  if (!firestore) return null;
  const userRef = doc(firestore, `users/${user.uid}`);
  const userData: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    isAdmin: false,
    isFounder: user.uid === '2D5EyrcNOzLCwFrFX1WSbVRH2662',
  };
  await setDoc(userRef, userData, { merge: true });
  return userData;
};

function MainAppContent({ children }: { children: React.ReactNode }) {
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
          createUserProfile(firestore, user).then(setUserProfile);
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

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <MainAppContent>
        {children}
      </MainAppContent>
    </FirebaseClientProvider>
  );
}
