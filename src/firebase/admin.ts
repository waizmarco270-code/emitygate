
import * as admin from 'firebase-admin';

// This function safely parses the service account JSON.
const getServiceAccount = () => {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
        // Log a warning if the service account is missing, but don't throw an error
        // during build time, as Vercel injects it at runtime.
        console.warn('FIREBASE_SERVICE_ACCOUNT environment variable is not set. This is expected during local build, but should be set in production.');
        return null;
    }
    try {
        return JSON.parse(serviceAccountJson);
    } catch (e) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:', e);
        return null;
    }
};

// Initialize Firebase Admin only if it hasn't been initialized yet.
if (!admin.apps.length) {
  const serviceAccount = getServiceAccount();
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    });
  }
}

const firestore = admin.apps.length ? admin.firestore() : null;
const storage = admin.apps.length ? admin.storage() : null;
const auth = admin.apps.length ? admin.auth() : null;

// Export getters that check for initialization.
export const getAdminFirestore = () => {
  if (!firestore) throw new Error('Firebase Admin (Firestore) has not been initialized.');
  return firestore;
};

export const getAdminStorage = () => {
    if (!storage) throw new Error('Firebase Admin (Storage) has not been initialized.');
    return storage;
};

export const getAdminAuth = () => {
    if (!auth) throw new Error('Firebase Admin (Auth) has not been initialized.');
    return auth;
};
