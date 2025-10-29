
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SkipForward, Volume2 } from 'lucide-react';

export default function SplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const videoDuration = 8000; // 8 seconds, as a fallback

  useEffect(() => {
    // This is a failsafe to ensure animation completes if the user doesn't interact.
    const failsafeTimer = setTimeout(() => {
      handleExit();
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

  const handleExit = (unmute = false) => {
    if (unmute && videoRef.current) {
        videoRef.current.muted = false;
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
       <video 
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        loop
        playsInline
        muted // Start muted to guarantee autoplay
        className="absolute top-0 left-0 w-full h-full object-cover"
       />
       <div className="absolute inset-0 bg-black/30" />
       
       <div className="relative z-10 flex flex-col items-center gap-4">
            <Button 
                variant="outline"
                size="lg"
                className="bg-black/50 border-white/50 text-white backdrop-blur-md hover:bg-white/20 hover:text-white animate-pulse"
                onClick={() => handleExit(true)}
            >
                <Volume2 className="mr-2" />
                Enter with Sound
            </Button>
             <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => handleExit(false)}
            >
                <SkipForward className="mr-2" />
                Skip
            </Button>
       </div>
    </div>
  );
}
