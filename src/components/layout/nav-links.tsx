'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' },
  { href: '/careers', label: 'Careers' },
  { href: '/legacy-vault', label: 'Legacy Vault' },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
