'use client';

import React, { useEffect, useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import type { Project } from '@/lib/projects-data';
import { defaultProjects } from '@/lib/projects-data';
import Hero from '@/components/sections/landing/hero';
import EmpireStats from '@/components/sections/landing/empire-stats';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const projectsQuery = firestore ? collection(firestore, 'projects') : null;
  const { data: projects, loading } = useCollection<Project>(projectsQuery);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const seedData = async () => {
      if (!firestore || projects?.length || isSeeding) return;
      
      const hasSeeded = localStorage.getItem('hasSeeded');
      if (hasSeeded) return;

      if (!loading && projects && projects.length === 0) {
        setIsSeeding(true);
        try {
          const batch = writeBatch(firestore);
          defaultProjects.forEach(project => {
            if (project.id) {
              const docRef = doc(firestore, 'projects', project.id);
              batch.set(docRef, project);
            }
          });
          await batch.commit();
          toast({ title: "Cosmos Restored", description: "The default project constellation has been deployed." });
          localStorage.setItem('hasSeeded', 'true');
        } catch (e: any) {
          toast({ variant: 'destructive', title: "Seed failed", description: e.message });
        } finally {
          setIsSeeding(false);
        }
      }
    };

    seedData();
  }, [firestore, projects, loading, isSeeding, toast]);

  return (
    <main className="flex flex-col items-center">
      <Hero />
      {(loading || isSeeding) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
              <p className="text-muted-foreground">
                  {isSeeding ? 'Restoring the cosmos...' : 'Connecting to the stars...'}
              </p>
          </div>
      )}
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
