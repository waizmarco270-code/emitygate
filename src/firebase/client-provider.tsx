
'use client';

import { useMemo, useState, useEffect } from 'react';
import { firebaseConfig } from '@/firebase/config';
import { initializeFirebase, FirebaseServices } from '@/firebase';
import { FirebaseProvider } from './provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FounderConsoleProvider } from '@/context/founder-console-context';
import FounderConsoleWrapper from '@/components/founder-console-wrapper';
import SplashScreen from '@/components/layout/splash-screen';

// This is a singleton pattern to ensure Firebase is initialized only once.
let firebaseServices: FirebaseServices | null = null;

const initializeClientFirebase = () => {
    if (firebaseServices) {
        return firebaseServices;
    }
    firebaseServices = initializeFirebase(firebaseConfig);
    return firebaseServices;
};

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSplash, setShowSplash] = useState(true);

  // `useMemo` ensures this only runs once per client session.
  const value = useMemo(() => {
    // We only want to initialize firebase on the client
    if (typeof window !== 'undefined') {
      return initializeClientFirebase();
    }
    // The server will render this as null, the client will have the services.
    return null;
  }, []);

  const handleAnimationComplete = () => {
    setShowSplash(false);
  }

  // Show splash screen on initial load
  if (showSplash) {
      return <SplashScreen onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <FirebaseProvider value={value}>
        {value ? (
           <div className="flex flex-col min-h-screen">
            <FounderConsoleProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <FounderConsoleWrapper />
            </FounderConsoleProvider>
           </div>
        ) : (
            // This is a fallback for the server render or if firebase fails to initialize
            // It just shows a blank screen to avoid hydration errors.
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background" />
        )}
    </FirebaseProvider>
  );
};
