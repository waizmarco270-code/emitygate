
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

export default function SplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const videoDuration = 8000; // 8 seconds, as a fallback

  useEffect(() => {
    // This is a failsafe to ensure animation completes if the user doesn't interact.
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

  const handleEnter = () => {
    if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play(); // Re-ensure play in case it was paused
    }
    setShouldAnimateOut(true);
  }
  

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000",
        shouldAnimateOut ? "opacity-0" : "opacity-100"
      )}
    >
       {/* Ensure 'public' folder exists in the root and contains 'video.mp4'. */}
       <video 
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        loop
        playsInline
        muted // Start muted to guarantee autoplay
        className="absolute top-0 left-0 w-full h-full object-cover"
       />
       {/* The overlay provides a nice vignette effect */}
       <div className="absolute inset-0 bg-black/30" />
       
       <div className="relative z-10 animate-pulse">
            <Button 
                variant="outline"
                size="lg"
                className="bg-black/50 border-white/50 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                onClick={handleEnter}
            >
                <Volume2 className="mr-2" />
                Enter with Sound
            </Button>
       </div>
    </div>
  );
}
