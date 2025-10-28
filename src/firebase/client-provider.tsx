
'use client';

import { useMemo } from 'react';
import { firebaseConfig } from '@/firebase/config';
import { initializeFirebase, FirebaseServices } from '@/firebase';
import { FirebaseProvider } from './provider';

// This is a singleton pattern to ensure Firebase is initialized only once.
let firebaseServices: FirebaseServices | null = null;

export const FirebaseClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // `useMemo` ensures this only runs once per client session.
  const value = useMemo(() => {
    // We only want to initialize firebase on the client
    if (typeof window !== 'undefined' && !firebaseServices) {
      firebaseServices = initializeFirebase(firebaseConfig);
    }
    // The server will render this as null, the client will have the services.
    return firebaseServices;
  }, []);

  // If the services are not yet available (e.g., during server-side rendering),
  // we can return a loading state or null to avoid rendering children that depend on Firebase.
  // Once the client hydrates, `value` will be populated and the children will render.
  if (!value) {
    return null; // Or a loading spinner
  }

  return (
    <FirebaseProvider value={value}>
      {children}
    </FirebaseProvider>
  );
};
