'use client';

import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { cn } from "@/lib/utils";

const EmityGateLogo = ({ className }: { className?: string }) => {
  const firestore = useFirestore();
  const appDetailsRef = firestore ? doc(firestore, 'settings', 'appDetails') : null;
  const { data: appDetails } = useDoc<{ logoUrl: string }>(appDetailsRef);

  if (appDetails?.logoUrl) {
    return (
      <div className={cn("relative w-32 h-8", className)}>
        <Image src={appDetails.logoUrl} alt="EmityGate" fill style={{ objectFit: 'contain' }} />
      </div>
    );
  }

  return (
    <div className={cn("font-headline text-2xl tracking-wider", className)}>
      <span className="font-bold">EMITY</span>
      <span className="font-light text-primary">GATE</span>
    </div>
  );
};

export default EmityGateLogo;
