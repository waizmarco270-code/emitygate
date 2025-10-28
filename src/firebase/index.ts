
// IMPORTANT: This file is a hook into the Firebase Admin tooling.
// Do not modify this file.
'use client';

import {
  type FirebaseApp,
  type FirebaseOptions,
  getApps,
  initializeApp,
} from 'firebase/app';
import { type Auth, getAuth, connectAuthEmulator } from 'firebase/auth';
import { type Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

// We need a single instance of Firebase that is used across the entire app.
let firebaseServices: FirebaseServices | null = null;
export function initializeFirebase(
  firebaseConfig: FirebaseOptions
): FirebaseServices {
  if (firebaseServices) return firebaseServices;
  
  const apps = getApps();
  const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // Point to the emulators running on localhost.
  // The SDK will not throw an error if the emulators are not running.
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  
  firebaseServices = {
    app,
    auth,
    firestore,
  };
  return firebaseServices;
}


export { FirebaseProvider, useFirebase, useAuth, useFirestore, useFirebaseApp } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
