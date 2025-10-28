'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Shield, FileText, Milestone, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CORRECT_PASSPHRASE = 'A PURE MASTERPIECE IS ALWAYS A PURE MASTERPIECE 🌹';

const SciFiLock = ({ unlocked }: { unlocked: boolean }) => (
    <div className="relative w-48 h-48 flex items-center justify-center">
        <Shield className={`w-48 h-48 transition-all duration-1000 ${unlocked ? 'text-primary' : 'text-destructive'}`} />
        <div className={`absolute w-32 h-32 rounded-full border-2 transition-all duration-500 ${unlocked ? 'border-primary animate-pulse-glow' : 'border-destructive'}`}></div>
        <div className="absolute">
            {unlocked ? <Unlock className="w-16 h-16 text-primary" /> : <Lock className="w-16 h-16 text-destructive" />}
        </div>
    </div>
);


const VaultContent = () => (
    <div className="w-full max-w-4xl text-center animate-page-enter">
        <h1 className="font-headline text-4xl text-primary">ACCESS GRANTED</h1>
        <p className="text-muted-foreground mt-2">Welcome to the Legacy Vault.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
             <Card className="bg-card/50 border-white/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><FileText /> Duraa Test Codex</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Core principles and foundational algorithms of the EmityGate ecosystem.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-white/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Milestone /> Empire Milestones</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">A classified timeline of pivotal moments and breakthroughs.</p></CardContent>
            </Card>
            <Card className="bg-card/50 border-white/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Archive /> Secret Archives</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Project blueprints, founder's notes, and future ambitions.</p></CardContent>
            </Card>
        </div>
    </div>
)

export default function VaultClient() {
  const [passphrase, setPassphrase] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (passphrase === CORRECT_PASSPHRASE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };
  
  if (unlocked) {
      return <VaultContent />;
  }

  return (
    <div className="w-full max-w-md text-center">
        <SciFiLock unlocked={unlocked} />
        <h1 className="font-headline text-3xl md:text-4xl mt-8">Legacy Vault</h1>
        <p className="text-muted-foreground mt-2">Access to this section is restricted.</p>

        <div className={`mt-8 space-y-4 transition-all ${error ? 'animate-shake' : ''}`}>
            <Input
                type="password"
                placeholder="Enter Passphrase"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className="text-center"
            />
            <Button onClick={handleUnlock} className="w-full">
                <Unlock className="mr-2 h-4 w-4" />
                Attempt Access
            </Button>
            {error && <p className="text-destructive text-sm">ACCESS DENIED</p>}
        </div>
    </div>
  );
}
