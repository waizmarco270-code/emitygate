
'use client';

import React from 'react';
import Link from 'next/link';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Project } from '@/lib/projects-data';
import { ICONS } from '@/lib/projects-data';
import { Loader2 } from 'lucide-react';
import Starfield from '@/components/starfield';

const Hero = () => {
  const position = useMousePosition();
  const firestore = useFirestore();
  const projectsQuery = firestore ? collection(firestore, 'projects') : null;
  const { data: projectsData, loading } = useCollection<Project>(projectsQuery);

  const parallax = (factor: number) => {
    if (typeof window === 'undefined') return { transform: 'translate(0, 0)' };
    const x = (position.x - window.innerWidth / 2) * factor;
    const y = (position.y - window.innerHeight / 2) * factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };
  
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="hsl(var(--background))"
      />
      
      {/* Galaxy System */}
      <div className="relative w-full h-full flex items-center justify-center" style={parallax(0.01)}>
        {/* Central Core */}
        <div className="z-10">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.5)] animate-pulse-glow">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {loading && <Loader2 className="absolute w-16 h-16 text-primary animate-spin" />}

        {/* Orbiting Planets */}
        {projectsData?.map((p, i) => {
          const angle = p.angle + time * p.speed;
          const x = Math.cos(angle * Math.PI / 180) * p.orbit;
          const y = Math.sin(angle * Math.PI / 180) * p.orbit;
          const Icon = ICONS[p.icon] || ICONS['Link'];

          return (
            <Link
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute transition-transform duration-500 ease-out z-20 group"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div
                className="rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 20px ${p.color}`,
                }}
              >
                <Icon className="text-white" style={{width: p.size*0.5, height: p.size*0.5 }} />
              </div>
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center pointer-events-none">
                  <p className="text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{p.name}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Foreground Text */}
      <div style={parallax(-0.02)} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="font-headline text-5xl md:text-8xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          EmityGate
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-muted-foreground">
          Building Tomorrow’s Legends.
        </p>
        <p className="mt-2 text-sm text-primary/70 font-code">
          &ldquo;Welcome to EmityGate — where ideas become empires.&rdquo;
        </p>
      </div>

       <div className="absolute bottom-10 z-30">
          <Button variant="ghost" className="text-muted-foreground animate-bounce pointer-events-auto" asChild>
              <Link href="#stats">
                  <ArrowDown className="mr-2 h-4 w-4" /> Explore
              </Link>
          </Button>
      </div>
      <div id="stats" className="absolute bottom-0 h-10" />

    </section>
  );
};

export default Hero;
