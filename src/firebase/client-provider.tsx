
'use client';

import { useMemo } from 'react';
import { firebaseConfig } from '@/firebase/config';
import { initializeFirebase, FirebaseServices } from '@/firebase';
import { FirebaseProvider } from './provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

let firebaseServices: FirebaseServices;

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // we use a useMemo here to ensure that we only initialize firebase once
  const value = useMemo(() => {
    // we only want to initialize firebase on the client
    if (typeof window !== 'undefined' && !firebaseServices) {
      firebaseServices = initializeFirebase(firebaseConfig);
    }
    return firebaseServices;
  }, []);

  return (
    <FirebaseProvider value={value}>
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    </FirebaseProvider>
  );
};
