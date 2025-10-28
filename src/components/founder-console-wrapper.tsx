
'use client';

import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import FounderConsole from './founder-console';

export default function FounderConsoleWrapper() {
    const { user } = useUser();
    const firestore = useFirestore();
    const userProfileRef = user && firestore ? doc(firestore, 'users', user.uid) : null;
    const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

    return <FounderConsole userProfile={userProfile} />;
}
