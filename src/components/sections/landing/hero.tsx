
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Project } from '@/lib/projects-data';
import { ICONS } from '@/lib/projects-data';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ParticleBackground from './particle-background';

const Hero = () => {
  const position = useMousePosition();
  const firestore = useFirestore();

  const projectsQuery = firestore ? collection(firestore, 'projects') : null;
  const { data: projectsData, loading: projectsLoading } = useCollection<Project>(projectsQuery);

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

  const sunProject = projectsData?.find(p => p.tier === 'core');
  const orbitingProjects = projectsData?.filter(p => p.tier !== 'core');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      {/* Galaxy System */}
      <div className="relative w-full h-full flex items-center justify-center" style={parallax(0.01)}>
        
        {/* Orbits */}
        <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(500, 500)">
                {orbitingProjects?.map((p) => (
                     <circle
                        key={`orbit-${p.id}`}
                        cx="0"
                        cy="0"
                        r={p.orbit}
                        fill="none"
                        stroke="hsl(var(--primary) / 0.1)"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                        className="animate-pulse-glow"
                     />
                ))}
            </g>
        </svg>

        {/* Central Core / Sun */}
        <div className="z-10">
          {sunProject && (
            <div
              className={cn(
                "w-48 h-48 rounded-full flex items-center justify-center relative overflow-hidden"
              )}
               style={{
                  backgroundColor: sunProject.color,
                  boxShadow: `0 0 ${sunProject.glowIntensity! * 5}px ${sunProject.color}, 0 0 ${sunProject.glowIntensity! * 10}px ${sunProject.color}80, inset 0 0 10px rgba(255,255,255,0.3)`,
                  animation: `pulse-glow ${12 - sunProject.glowIntensity!}s infinite ease-in-out`
               }}
            >
              {sunProject.iconImage ? (
                <Image src={sunProject.iconImage} alt={sunProject.name} layout="fill" objectFit="cover" className="rounded-full" />
              ) : (
                <span className="font-headline text-3xl text-white tracking-widest">{sunProject.name}</span>
              )}
            </div>
          )}
        </div>


        {projectsLoading && <Loader2 className="absolute w-16 h-16 text-primary animate-spin" />}

        {/* Orbiting Planets */}
        {orbitingProjects?.map((p) => {
          const angle = p.angle + time * p.speed;
          const x = Math.cos(angle * Math.PI / 180) * p.orbit;
          const y = Math.sin(angle * Math.PI / 180) * p.orbit;
          const Icon = ICONS[p.icon] || ICONS['Link'];
          const glow = p.glowIntensity || 5;

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
                className="rounded-full flex items-center justify-center transition-all hover:scale-110 relative overflow-hidden"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${glow * 2}px ${p.color}, 0 0 ${glow * 4}px ${p.color}80, inset 0 0 ${glow}px rgba(255,255,255,0.3)`,
                }}
              >
                {p.iconImage ? (
                  <Image src={p.iconImage} alt={p.name} layout="fill" objectFit="cover" className="rounded-full" />
                ) : (
                  <Icon className="text-white" style={{width: p.size*0.5, height: p.size*0.5 }} />
                )}
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
        <h1 className="font-headline text-8xl md:text-9xl tracking-widest">
            <span className="font-bold text-white">EMITY</span>
            <span className="font-light text-primary">GATE</span>
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

    