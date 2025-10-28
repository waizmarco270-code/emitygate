
'use client';

import { Twitter, Linkedin, Github } from 'lucide-react';
import EmityGateLogo from '@/components/icons/emity-gate-logo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex-shrink-0">
            <EmityGateLogo />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <Github />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EmityGate, Inc. All rights reserved.</p>
          <p className="mt-1">Forging the legends of tomorrow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
