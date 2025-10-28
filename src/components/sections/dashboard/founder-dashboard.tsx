
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, BarChart as BarChartIcon, FileText, Globe, Users, Waypoints, Link as LinkIcon, Pencil, HardDrive } from "lucide-react";
import { Bar, BarChart as RechartsBar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection } from "@/firebase";
import { useFirestore } from "@/firebase/provider";
import { collection } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { projectsData, type Project } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const engagementData = [
    { name: 'Zenix', value: 4000 },
    { name: 'NotesGate', value: 3000 },
    { name: 'LedGate', value: 2000 },
    { name: 'MindMate', value: 2780 },
    { name: 'PlayGate', value: 1890 },
];

const OverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Metric Cards */}
        <Card className="lg:col-span-1 border-primary/20 hover:border-primary/50 transition-all glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Empire Population</CardTitle>
                <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-headline">12.5M</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
        </Card>
        <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-headline">{projectsData.length}</div>
                <p className="text-xs text-muted-foreground">2 initiatives in R&D</p>
            </CardContent>
        </Card>
         <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Pulse</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-headline">98.7%</div>
                <p className="text-xs text-muted-foreground">System-wide uptime</p>
            </CardContent>
        </Card>
         <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Strategic Directives</CardTitle>
                <Waypoints className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-headline">3</div>
                <p className="text-xs text-muted-foreground">Active top-level goals</p>
            </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-primary" />
                    Project Engagement
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                     <RechartsBar data={engagementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                            }}
                        />
                        <Legend />
                        <Bar dataKey="value" name="Active Users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </RechartsBar>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Founder's Log */}
        <Card className="lg:col-span-2">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Founder's Log
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">A secure channel for your eyes only, Founder.</p>
                <div className="p-4 bg-muted/50 rounded-lg border text-sm">
                    <p className="font-mono text-primary/80">&gt; Initiate 'Project Chronos' directive.</p>
                    <p className="font-mono text-muted-foreground mt-2">&gt; Security council meeting scheduled for 2024-Q4.</p>
                    <p className="font-mono text-muted-foreground mt-2">&gt; NotesGate sentiment analysis shows positive trend in user adoption.</p>
                </div>
            </CardContent>
        </Card>
    </div>
);

const TeamMembersTab = () => {
    const firestore = useFirestore();
    const usersQuery = firestore ? collection(firestore, 'users') : null;
    const { data: users, loading, error } = useCollection<UserProfile>(usersQuery);

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    }

    if (error) {
        return <div className="text-destructive">Error loading team members: {error.message}</div>
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Roster</CardTitle>
                <CardDescription>An overview of all members in the EmityGate network.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map(user => (
                            <TableRow key={user.uid}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.photoURL || undefined} />
                                            <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.displayName || 'N/A'}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                <TableCell>
                                    {user.isFounder ? <Badge variant="destructive">Founder</Badge> : 
                                     user.isAdmin ? <Badge variant="default">Admin</Badge> : 
                                     <Badge variant="secondary">User</Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

const ProjectsTab = () => (
    <Card>
        <CardHeader>
            <CardTitle>Project Constellation</CardTitle>
            <CardDescription>Manage the projects orbiting the EmityGate core.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectsData.map((project) => {
                        const Icon = project.icon;
                        return (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: project.color }}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="font-medium">{project.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                        {project.url} <LinkIcon className="w-4 h-4" />
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" disabled>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default function FounderDashboard() {
    return (
        <Tabs defaultValue="overview" className="w-full animate-page-enter">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <OverviewTab />
            </TabsContent>
            <TabsContent value="team">
                <TeamMembersTab />
            </TabsContent>
            <TabsContent value="projects">
                <ProjectsTab />
            </TabsContent>
        </Tabs>
    );
}
