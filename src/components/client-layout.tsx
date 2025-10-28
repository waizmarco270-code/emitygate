
'use client';

import React, { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import FounderConsole from '../founder-console';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const firestore = useFirestore();
    const userProfileRef = user && firestore ? doc(firestore, 'users', user.uid) : null;
    const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

    const [isConsoleOpen, setIsConsoleOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'E') {
            event.preventDefault();
            if (userProfile?.isFounder) {
            setIsConsoleOpen(prev => !prev);
            }
        }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        };
    }, [userProfile?.isFounder]);

  return (
    <>
        {children}
        <FounderConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} userProfile={userProfile} />
    </>
  );
}
