'use client';

import React from 'react';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

const projects = [
  { name: 'Zenix', color: 'hsl(180, 80%, 60%)', size: 60, orbit: 180, angle: 30, speed: 0.8 },
  { name: 'WaizGPT', color: 'hsl(220, 80%, 70%)', size: 80, orbit: 280, angle: 110, speed: 0.6 },
  { name: 'LedGate', color: 'hsl(300, 80%, 70%)', size: 50, orbit: 220, angle: 190, speed: 0.7 },
  { name: 'WaizVerse', color: 'hsl(40, 80%, 60%)', size: 90, orbit: 360, angle: 260, speed: 0.5 },
  { name: 'EmityLabs', color: 'hsl(120, 80%, 60%)', size: 70, orbit: 320, angle: 330, speed: 0.65 },
];

const Hero = () => {
  const position = useMousePosition();

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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      {/* Galaxy System */}
      <div className="relative w-[800px] h-[800px] flex items-center justify-center">
        {/* Central Core */}
        <div style={parallax(0.01)} className="z-10">
          <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-glow">
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-primary/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Orbiting Planets */}
        {projects.map((p, i) => {
          const angle = p.angle + time * p.speed;
          const x = Math.cos(angle * Math.PI / 180) * p.orbit;
          const y = Math.sin(angle * Math.PI / 180) * p.orbit;

          return (
            <div
              key={p.name}
              className="absolute transition-transform duration-500 ease-out"
              style={{
                ...parallax(0.01 + i * 0.005),
                transform: `translate(${x}px, ${y}px) ${parallax(0.01 + i * 0.005).transform}`,
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
                <span className="font-headline text-xs text-background/80">{p.name}</span>
              </div>
            </div>
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
          <Button variant="ghost" className="text-muted-foreground animate-bounce" asChild>
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
