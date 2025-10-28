'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import EmityGateLogo from './icons/emity-gate-logo';
import { Moon, Sun } from 'lucide-react';
import { Card } from './ui/card';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="p-4 flex items-center justify-between space-x-4 w-72 bg-card/50 border-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
            <EmityGateLogo className="text-lg" />
        </div>
      <div className="flex items-center space-x-2">
        <Sun className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        />
        <Moon className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
      </div>
    </Card>
  );
}
