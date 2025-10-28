import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import NavLinks from './nav-links';
import EmityGateLogo from '../icons/emity-gate-logo';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <EmityGateLogo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-8">
                <EmityGateLogo />
              </Link>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/admin">Admin Login</Link>
          </Button>
          <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow" asChild>
            <Link href="/careers">Join Us</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
