
'use client';

import { useState, useEffect } from 'react';
import type { Query, DocumentData, FirestoreError, CollectionReference } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

interface UseCollection<T> {
  data: T[] | null;
  loading: boolean;
  error: FirestoreError | null;
}

export const useCollection = <T extends DocumentData>(
  query: Query<T> | CollectionReference<T> | null
): UseCollection<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const data: T[] = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [JSON.stringify(query)]); // Basic dependency tracking

  return { data, loading, error };
};
