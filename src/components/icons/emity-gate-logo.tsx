
'use client';

import Image from 'next/image';
import { cn } from "@/lib/utils";

const EmityGateLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-32 h-8", className)}>
        <Image src="/logo.jpg" alt="EmityGate" fill style={{ objectFit: 'contain' }} />
    </div>
  );
};

export default EmityGateLogo;
