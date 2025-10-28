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

  // If the services are not yet available (e.g., during server-side rendering),
  // we can return a loading state or null to avoid rendering children that depend on Firebase.
  // Once the client hydrates, `value` will be populated and the children will render.
  if (!value) {
    return (
        <>
            <main className="flex-grow">{children}</main>
        </>
    );
  }

  return (
    <FirebaseProvider value={value}>
      <FounderConsoleProvider>
        <>
            <AppHead />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FounderConsoleWrapper />
        </>
      </FounderConsoleProvider>
    </FirebaseProvider>
  );
};
