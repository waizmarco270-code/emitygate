
import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT environment variable');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
    storageBucket: "studio-3948310678-9a7f7.appspot.com"
  });
}

const firestore = admin.firestore();
const storage = admin.storage();

export const getAdminFirestore = () => firestore;
export const getAdminStorage = () => storage;
