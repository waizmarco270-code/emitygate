
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Shield, FileText, Milestone, Archive, Loader2, Download, KeyRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkVaultPassphrase, getEnvContentAction } from '@/lib/actions';

const SciFiLock = ({ unlocked }: { unlocked: boolean }) => (
    <div className="relative w-48 h-48 flex items-center justify-center">
        <Shield className={`w-48 h-48 transition-all duration-1000 ${unlocked ? 'text-primary' : 'text-destructive'}`} />
        <div className={`absolute w-32 h-32 rounded-full border-2 transition-all duration-500 ${unlocked ? 'border-primary animate-pulse-glow' : 'border-destructive'}`}></div>
        <div className="absolute">
            {unlocked ? <Unlock className="w-16 h-16 text-primary" /> : <Lock className="w-16 h-16 text-destructive" />}
        </div>
    </div>
);


const VaultContent = () => {
    const [envContent, setEnvContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEnv = async () => {
            setIsLoading(true);
            const content = await getEnvContentAction();
            if (content) {
                setEnvContent(content);
            }
            setIsLoading(false);
        };
        fetchEnv();
    }, []);

    const handleDownload = () => {
        const blob = new Blob([envContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '.env';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <div className="w-full max-w-4xl text-center animate-page-enter">
            <h1 className="font-headline text-4xl text-primary">ACCESS GRANTED</h1>
            <p className="text-muted-foreground mt-2">Welcome to the Legacy Vault.</p>
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                 <Card className="bg-card/50 border-white/10 md:col-span-3">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2"><KeyRound /> Deployment Keys</CardTitle>
                            <Button size="sm" onClick={handleDownload} disabled={isLoading || !envContent}>
                                <Download className="mr-2 h-4 w-4" />
                                Download .env File
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <pre className="bg-background p-4 rounded-md text-left text-sm text-muted-foreground overflow-x-auto">
                                <code>{envContent}</code>
                            </pre>
                        )}
                    </CardContent>
                </Card>
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
}

export default function VaultClient() {
  const [passphrase, setPassphrase] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleUnlock = async () => {
    setIsLoading(true);
    setError(null);
    const response = await checkVaultPassphrase(passphrase);
    if (response.success) {
      setUnlocked(true);
    } else {
      setError(response.error || 'ACCESS DENIED');
      setTimeout(() => setError(null), 1500);
    }
    setIsLoading(false);
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
                disabled={isLoading}
            />
            <Button onClick={handleUnlock} className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Unlock className="mr-2 h-4 w-4" />}
                Attempt Access
            </Button>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
    </div>
  );
}
