
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {

  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const videoDuration = 8000; // 8 seconds

  useEffect(() => {
    // This is a failsafe to ensure animation completes.
    // It should match the video's length.
    const failsafeTimer = setTimeout(() => {
      setShouldAnimateOut(true);
    }, videoDuration);

    return () => {
        clearTimeout(failsafeTimer);
    };
  }, []);
  
  useEffect(() => {
      if (shouldAnimateOut) {
          // This timer should match the CSS transition duration.
          const animationEndTimer = setTimeout(() => {
              onAnimationComplete();
          }, 1000); // Corresponds to the opacity transition duration.
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
       {/* Create a 'public' folder in the root of your project. */}
       {/* Place your video file named 'video.mp4' inside the 'public' folder. */}
       <video 
        src="/video.mp4"
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        onEnded={() => setShouldAnimateOut(true)}
       />
       {/* The overlay provides a nice vignette effect */}
       <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
