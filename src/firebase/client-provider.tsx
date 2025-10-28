'use client';

import { useMemo } from 'react';
import { firebaseConfig } from '@/firebase/config';
import { initializeFirebase, FirebaseServices } from '@/firebase';
import { FirebaseProvider } from './provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FounderConsoleProvider } from '@/context/founder-console-context';
import FounderConsoleWrapper from '@/components/founder-console-wrapper';
import { useDoc, useFirestore } from '.';
import { doc } from 'firebase/firestore';
import Head from 'next/head';
import PageWrapper from '@/components/page-wrapper';
import { Loader2 } from 'lucide-react';

// This is a singleton pattern to ensure Firebase is initialized only once.
let firebaseServices: FirebaseServices | null = null;

const initializeClientFirebase = () => {
    if (firebaseServices) {
        return firebaseServices;
    }
    firebaseServices = initializeFirebase(firebaseConfig);
    return firebaseServices;
};

const AppHead = () => {
    const firestore = useFirestore();
    const appDetailsRef = firestore ? doc(firestore, 'settings', 'appDetails') : null;
    const { data: appDetails } = useDoc<{ faviconUrl: string }>(appDetailsRef);

    return (
        <Head>
            {appDetails?.faviconUrl && <link rel="icon" href={appDetails.faviconUrl} />}
        </Head>
    )
}

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // `useMemo` ensures this only runs once per client session.
  const value = useMemo(() => {
    // We only want to initialize firebase on the client
    if (typeof window !== 'undefined') {
      return initializeClientFirebase();
    }
    // The server will render this as null, the client will have the services.
    return null;
  }, []);


  return (
    <FirebaseProvider value={value}>
      {value ? (
        <FounderConsoleProvider>
            <AppHead />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FounderConsoleWrapper />
        </FounderConsoleProvider>
      ) : (
        <PageWrapper>
          <main className="container mx-auto py-12 flex justify-center items-center h-[80vh]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </main>
        </PageWrapper>
      )}
    </FirebaseProvider>
  );
};
