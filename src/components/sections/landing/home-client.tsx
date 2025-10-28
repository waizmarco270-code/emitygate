
'use client';

import Hero from '@/components/sections/landing/hero';
import EmpireStats from '@/components/sections/landing/empire-stats';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomeClient() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <div className="w-full max-w-7xl px-4 md:px-8">
        <Separator className="my-12 md:my-24" />
        <EmpireStats />
      </div>
      <div className="my-24">
        <ThemeToggle />
      </div>
    </main>
  );
}
