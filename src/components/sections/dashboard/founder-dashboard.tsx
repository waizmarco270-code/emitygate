
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, BarChart as BarChartIcon, FileText, Globe, Users, Waypoints, Loader2 } from "lucide-react";
import { Bar, BarChart as RechartsBar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection } from "@/firebase";
import { useFirestore } from "@/firebase/provider";
import { collection } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
    { name: 'Zenix', value: 4000 },
    { name: 'WaizGPT', value: 3000 },
    { name: 'LedGate', value: 2000 },
    { name: 'WaizVerse', value: 2780 },
    { name: 'EmityLabs', value: 1890 },
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
                <AreaChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-headline">5</div>
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
                     <RechartsBar data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                    <p className="font-mono text-muted-foreground mt-2">&gt; WaizGPT sentiment analysis shows positive trend in user adoption.</p>
                </div>
            </CardContent>
        </Card>
    </div>
);

const TeamMembersTab = () => {
    const firestore = useFirestore();
    const usersQuery = collection(firestore, 'users');
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

export default function FounderDashboard() {
    return (
        <Tabs defaultValue="overview" className="w-full animate-page-enter">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <OverviewTab />
            </TabsContent>
            <TabsContent value="team">
                <TeamMembersTab />
            </TabsContent>
        </Tabs>
    );
}
