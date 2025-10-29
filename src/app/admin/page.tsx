
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from "@/components/page-wrapper";
import AdminDashboard from "@/components/sections/admin/admin-dashboard";
import { useUser, useFirestore, useDoc } from '@/firebase';
import type { UserProfile } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  
  const userProfileRef = (user && firestore) ? doc(firestore, "users", user.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);

  const isLoading = userLoading || profileLoading;

  useEffect(() => {
    if (!isLoading && userProfile && !userProfile.isAdmin && !userProfile.isFounder) {
      router.push('/dashboard');
    }
  }, [isLoading, userProfile, router]);


  if (isLoading || !userProfile?.isAdmin && !userProfile?.isFounder) {
    return (
      <PageWrapper>
        <main className="container mx-auto py-12 flex flex-col justify-center items-center h-[80vh] gap-4">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying clearance...</p>
        </main>
      </PageWrapper>
    )
  }
  
  return (
    <PageWrapper>
      <main className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl tracking-wide">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor the EmityGate empire.</p>
        </div>
        <AdminDashboard />
      </main>
    </PageWrapper>
  );
}
