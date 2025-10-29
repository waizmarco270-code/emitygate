
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { ICONS, type Project } from '@/lib/projects-data';
import { collection } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const firestore = useFirestore();
  const projectsQuery = firestore ? collection(firestore, 'projects') : null;
  const { data: projectsData, loading: projectsLoading } = useCollection<Project>(projectsQuery);

  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);

  const sunProject = projectsData?.find(p => p.tier === 'core');

  useEffect(() => {
    if (!projectsLoading) {
      // Start the fade-out animation
      setShouldAnimateOut(true);
      // Wait for the animation to finish before calling the callback
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 500); // Corresponds to the animation duration
      return () => clearTimeout(timer);
    }
  }, [projectsLoading, onAnimationComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500",
        shouldAnimateOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative">
        {projectsLoading && !sunProject ? (
          <Loader2 className="w-24 h-24 animate-spin text-primary" />
        ) : sunProject ? (
          <div
            className={cn(
              "w-48 h-48 rounded-full flex items-center justify-center relative overflow-hidden animate-pulse-glow"
            )}
             style={{
                backgroundColor: sunProject.color,
                boxShadow: `0 0 ${sunProject.glowIntensity! * 5}px ${sunProject.color}, 0 0 ${sunProject.glowIntensity! * 10}px ${sunProject.color}80, inset 0 0 10px rgba(255,255,255,0.3)`,
                animationDuration: `${12 - sunProject.glowIntensity!}s`,
             }}
          >
            {sunProject.iconImage ? (
              <Image src={sunProject.iconImage} alt={sunProject.name} layout="fill" objectFit="cover" className="rounded-full" />
            ) : (
              <span className="font-headline text-3xl text-white tracking-widest">{sunProject.name}</span>
            )}
          </div>
        ) : (
           <Loader2 className="w-24 h-24 animate-spin text-primary" />
        )}
      </div>
    </div>
  );
}
