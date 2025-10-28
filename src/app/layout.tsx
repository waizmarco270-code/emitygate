
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';

// This is a temporary app instance for server-side fetching.
// It's not the same as the client-side instance.
const tempApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(tempApp);

async function getAppSettings() {
  // Ensure firestore is initialized before trying to use it.
  if (!db) {
    return { faviconUrl: null };
  }
  const appDetailsRef = doc(db, 'settings', 'appDetails');
  try {
    const appDetailsSnap = await getDoc(appDetailsRef);
    if (appDetailsSnap.exists()) {
      return appDetailsSnap.data();
    }
  } catch (error) {
    console.error("Error fetching app settings on server:", error);
  }
  return { faviconUrl: null };
}

export const metadata: Metadata = {
  title: 'EmityGate Command',
  description: 'Building Tomorrow’s Legends.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getAppSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
        {settings?.faviconUrl && <link rel="icon" href={settings.faviconUrl} />}
      </head>
      <body className="font-body antialiased bg-background overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
