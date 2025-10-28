
'use client';

import { cn } from "@/lib/utils";

const EmityGateLogo = ({ className }: { className?: string }) => {
  return (
    <h1 className={cn("font-headline text-2xl tracking-widest", className)}>
      <span className="font-bold text-white">EMITY</span>
      <span className="font-light text-primary">GATE</span>
    </h1>
  );
};

export default EmityGateLogo;
