
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Globe, Cpu, Film } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { useFounderConsole } from '@/context/founder-console-context';

const WorldMap = () => (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-background/20 p-4">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
            <path d="M500 250 m -200 0 a 200 200 0 1 0 400 0 a 200 200 0 1 0 -400 0" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1"/>
            <circle cx="500" cy="250" r="2" fill="hsl(var(--primary))" />
            {/* Mock activity pulses */}
            {[...Array(5)].map((_, i) => (
                <circle key={i} cx={500 + (Math.random() - 0.5) * 380} cy={250 + (Math.random() - 0.5) * 200} r="3" fill="hsl(var(--primary))" className="opacity-75">
                    <animate attributeName="r" from="3" to="15" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.75" to="0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
            ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-headline text-primary/80 text-lg tracking-widest">LEGACY PULSE</p>
        </div>
    </div>
);


export default function FounderConsole({ userProfile }: { userProfile: UserProfile | null }) {
  const { isConsoleOpen, setIsConsoleOpen } = useFounderConsole();

  if (!userProfile?.isFounder) return null;

  return (
    <Dialog open={isConsoleOpen} onOpenChange={setIsConsoleOpen}>
        <DialogContent className="max-w-4xl h-[80vh] bg-black/80 backdrop-blur-md border-primary/50 text-primary">
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-primary tracking-widest">
                    <span className="flex items-center gap-2"><Cpu size={24}/> FOUNDER CONSOLE</span>
                </DialogTitle>
                <DialogDescription className="text-primary/70">
                    Empires aren’t built in days — they’re forged in the mind.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full pt-4">
                <div className="md:col-span-2 space-y-4">
                    <h3 className="font-headline text-lg flex items-center gap-2"><Globe size={20}/> Live Activity</h3>
                    <WorldMap />
                </div>
                <div className="space-y-4">
                    <h3 className="font-headline text-lg flex items-center gap-2"><Film size={20}/> Cinematics</h3>
                    <div className="space-y-2">
                        <button className="w-full text-left p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">Project Zenix Launch Trailer</button>
                        <button className="w-full text-left p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">The EmityGate Story</button>
                        <button className="w-full text-left p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors text-primary/50 cursor-not-allowed">Verified Admin Cinematic (Locked)</button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  );
}
