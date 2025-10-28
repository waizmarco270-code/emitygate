
'use client';

import PageWrapper from "@/components/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useUser, useFirestore, useDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";
import { useEffect } from "react";
import FounderDashboard from "@/components/sections/dashboard/founder-dashboard";
import { Loader2 } from "lucide-react";

const TaskCard = ({ title, tags }: { title: string, tags: string[] }) => (
    <Card className="bg-muted/50 mb-2">
        <CardContent className="p-3">
            <p className="font-medium text-sm">{title}</p>
            <div className="flex gap-1 mt-2">
                {tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
        </CardContent>
    </Card>
);

const StandardDashboard = () => (
  <div className="grid lg:grid-cols-3 gap-8">
      {/* Chat System Mockup */}
      <Card className="lg:col-span-1">
          <CardHeader>
              <CardTitle>Internal Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[60vh]">
              <div className="flex-grow border rounded-lg p-2 space-y-4 overflow-y-auto">
                  <div className="flex items-start gap-2">
                      <Avatar><AvatarImage src="https://picsum.photos/seed/duraa/40/40" /><AvatarFallback>D</AvatarFallback></Avatar>
                      <div className="bg-primary/20 p-2 rounded-lg"><p className="text-sm">Team, prep for the Zenix launch is on schedule. Report any blockers.</p></div>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                      <div className="bg-muted p-2 rounded-lg"><p className="text-sm">Roger that. WaizGPT integration is complete.</p></div>
                      <Avatar><AvatarImage src="https://picsum.photos/seed/sam/40/40" /><AvatarFallback>S</AvatarFallback></Avatar>
                  </div>
              </div>
              <div className="mt-4 flex gap-2">
                  <Input placeholder="Type a message..." />
                  <Button><Send size={18} /></Button>
              </div>
          </CardContent>
      </Card>

      {/* Task Board Mockup */}
      <Card className="lg:col-span-2">
          <CardHeader>
              <CardTitle>Project WaizVerse - Sprint 3</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-3 gap-4">
                  <div>
                      <h3 className="font-semibold mb-4 text-center">To Do</h3>
                      <TaskCard title="Design character assets" tags={['UI/UX']} />
                      <TaskCard title="Setup database schema" tags={['Backend']} />
                  </div>
                   <div>
                      <h3 className="font-semibold mb-4 text-center text-yellow-400">In Progress</h3>
                      <TaskCard title="Develop login/auth flow" tags={['Frontend', 'Backend']} />
                  </div>
                   <div>
                      <h3 className="font-semibold mb-4 text-center text-green-400">Done</h3>
                      <TaskCard title="Project scaffolding with Next.js" tags={['Frontend']} />
                      <TaskCard title="Define MVP features" tags={['Product']} />
                  </div>
              </div>
          </CardContent>
      </Card>
  </div>
);


export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  
  const userProfileRef = (user && firestore) ? doc(firestore, "users", user.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    if (user && !profileLoading && !userProfile && firestore) {
        const userRef = doc(firestore, "users", user.uid);
        const newUserProfile: Omit<UserProfile, 'id'> = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAdmin: false,
            isFounder: user.uid === '2D5EyrcNOzLCwFrFX1WSbVRH2662',
        };
        setDoc(userRef, newUserProfile);
    }
  }, [user, userProfile, profileLoading, firestore]);

  const isLoading = userLoading || profileLoading;

  if (isLoading) {
    return (
      <PageWrapper>
        <main className="container mx-auto py-12 flex justify-center items-center h-[80vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </main>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <main className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl tracking-wide">
             {userProfile?.isFounder ? 'Founder Dashboard' : 'Emity Network'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {userProfile?.isFounder ? 'Oversee the entire EmityGate empire.' : 'Internal tools and collaboration hub.'}
          </p>
        </div>
        
        {userProfile?.isFounder ? <FounderDashboard /> : <StandardDashboard />}
        
      </main>
    </PageWrapper>
  );
}
