
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {

  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);

  useEffect(() => {
    // This is a failsafe to ensure animation completes even if video metadata loading is slow.
    const failsafeTimer = setTimeout(() => {
      setShouldAnimateOut(true);
    }, 4000); // Wait 4 seconds before forcing the fade out.

    // The primary trigger for fading out.
    const readyTimer = setTimeout(() => {
        setShouldAnimateOut(true);
    }, 2500); // Start fade-out after 2.5 seconds.


    return () => {
        clearTimeout(failsafeTimer);
        clearTimeout(readyTimer);
    };
  }, []);
  
  useEffect(() => {
      if (shouldAnimateOut) {
          const animationEndTimer = setTimeout(() => {
              onAnimationComplete();
          }, 1000); // Corresponds to the animation duration
          return () => clearTimeout(animationEndTimer);
      }
  }, [shouldAnimateOut, onAnimationComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000",
        shouldAnimateOut ? "opacity-0" : "opacity-100"
      )}
    >
       {/* === VIDEO PLACEHOLDER === */}
       {/* Replace the src below with your own video file. */}
       <video 
        src="https://cdn.pixabay.com/video/2022/10/06/133453-760773611_large.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
       />
       {/* The overlay provides a nice vignette effect */}
       <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
