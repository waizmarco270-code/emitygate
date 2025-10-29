
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';


const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/careers', label: 'Careers' },
];

const authenticatedLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/legacy-vault', label: 'Legacy Vault' },
];

const adminLink = { href: '/admin', label: 'Admin' };

const NavLinks = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const firestore = useFirestore();
  const userProfileRef = user && firestore ? doc(firestore, 'users', user.uid) : null;
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const linksToRender = user 
    ? [...publicLinks, ...authenticatedLinks] 
    : publicLinks;

  return (
    <>
      {linksToRender.map(({ href, label }) => (
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
      {userProfile && (userProfile.isAdmin || userProfile.isFounder) && (
         <Link
          key={adminLink.href}
          href={adminLink.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === adminLink.href ? 'text-primary font-semibold' : 'text-muted-foreground'
          )}
        >
          {adminLink.label}
        </Link>
      )}
    </>
  );
};

export default NavLinks;
