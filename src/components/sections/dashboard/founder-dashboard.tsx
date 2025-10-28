
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart as BarChartIcon, FileText, Globe, Users, Waypoints, Link as LinkIcon, Pencil, Trash2, PlusCircle, HardDrive } from "lucide-react";
import { Bar, BarChart as RechartsBar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirestore } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ICONS, defaultProjects, type Project } from '@/lib/projects-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getOrbitalProperties } from '@/lib/orbital-mechanics';

const engagementData = [
    { name: 'Zenix', value: 4000 },
    { name: 'NotesGate', value: 3000 },
    { name: 'LedGate', value: 2000 },
    { name: 'MindMate', value: 2780 },
    { name: 'PlayGate', value: 1890 },
];

const OverviewTab = () => {
    const firestore = useFirestore();
    const projectsQuery = firestore ? collection(firestore, 'projects') : null;
    const { data: projectsData } = useCollection<Project>(projectsQuery);

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="text-4xl font-bold font-headline">{projectsData?.length ?? <Loader2 className="h-8 w-8 animate-spin" />}</div>
                <p className="text-xs text-muted-foreground">2 initiatives in R&D</p>
            </CardContent>
        </Card>
         <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Pulse</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font.bold font-headline">98.7%</div>
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
                    <p className="font-mono text-primary/80">> Initiate 'Project Chronos' directive.</p>
                    <p className="font-mono text-muted-foreground mt-2">> Security council meeting scheduled for 2024-Q4.</p>
                    <p className="font-mono text-muted-foreground mt-2">> NotesGate sentiment analysis shows positive trend in user adoption.</p>
                </div>
            </CardContent>
        </Card>
    </div>
)};

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
};

const ProjectForm = ({ project, onSave, onCancel }: { project?: Partial<Project> | null, onSave: (project: Partial<Project>) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Project>>(project || { name: '', description: '', icon: 'Link', color: 'hsl(207, 90%, 40%)', url: '', tier: 'inner', sizePreset: 'medium' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
            <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" value={formData.url} onChange={handleChange} required />
            </div>
            <div className="col-span-full space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                 <Select name="icon" value={formData.icon} onValueChange={handleSelectChange('icon')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(ICONS).map(iconName => {
                            const Icon = ICONS[iconName];
                            return <SelectItem key={iconName} value={iconName}><span className="flex items-center gap-2"><Icon /> {iconName}</span></SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="color">Color (HSL)</Label>
                <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="tier">Orbital Tier</Label>
                <Select name="tier" value={formData.tier} onValueChange={handleSelectChange('tier')}>
                    <SelectTrigger><SelectValue placeholder="Select a tier" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="inner">Inner Ring</SelectItem>
                        <SelectItem value="outer">Outer Ring</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="sizePreset">Planet Size</Label>
                <Select name="sizePreset" value={formData.sizePreset} onValueChange={handleSelectChange('sizePreset')}>
                    <SelectTrigger><SelectValue placeholder="Select a size" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter className="col-span-full">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Project</Button>
            </DialogFooter>
        </form>
    );
};

const ProjectsTab = ({ onSetProjectToDelete }: { onSetProjectToDelete: (project: Project | null) => void }) => {
    const firestore = useFirestore();
    const { toast } = useToast();
    const projectsQuery = firestore ? collection(firestore, 'projects') : null;
    const { data: projects, loading, error } = useCollection<Project>(projectsQuery);

    const [isFormOpen, setFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [isSeedLoading, setSeedLoading] = useState(false);

    const handleSaveProject = async (projectData: Partial<Project>) => {
        if (!firestore) return;
        
        const orbitalProperties = getOrbitalProperties(projectData.tier, projectData.sizePreset);
        const projectToSave = {
            name: projectData.name!,
            description: projectData.description!,
            icon: projectData.icon!,
            color: projectData.color!,
            url: projectData.url!,
            tier: projectData.tier!,
            sizePreset: projectData.sizePreset!,
            ...orbitalProperties,
        };

        const id = projectData.id || doc(collection(firestore, 'projects')).id;
        const docRef = doc(firestore, 'projects', id);

        try {
            await setDoc(docRef, projectToSave, { merge: true });
            toast({ title: "Project saved", description: `${projectToSave.name} has been updated in the cosmos.` });
        } catch (e: any) {
            toast({ variant: 'destructive', title: "Save failed", description: e.message });
        } finally {
            setFormOpen(false);
            setEditingProject(null);
        }
    };

    const handleSeedData = async () => {
        if (!firestore) return;
        setSeedLoading(true);
        try {
            const batch = writeBatch(firestore);
            defaultProjects.forEach(project => {
                const docRef = doc(firestore, 'projects', project.id!);
                batch.set(docRef, project);
            });
            await batch.commit();
            toast({ title: "Cosmos Seeded", description: "The default project constellation has been deployed."});
        } catch (e: any) {
             toast({ variant: 'destructive', title: "Seed failed", description: e.message });
        }
        setSeedLoading(false);
    }

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    }

    if (error) {
        return <div className="text-destructive">Error loading projects: {error.message}</div>
    }

    return (
        <>
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Project Constellation</CardTitle>
                        <CardDescription>Manage the projects orbiting the EmityGate core.</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => { setEditingProject(null); setFormOpen(true); }}><PlusCircle /> Add Project</Button>
                </CardHeader>
                <CardContent>
                    {projects && projects.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead>Tier</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => {
                                    const Icon = ICONS[project.icon] || LinkIcon;
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
                                            <TableCell><Badge variant="outline">{project.tier}</Badge></TableCell>
                                            <TableCell><Badge variant="outline">{project.sizePreset}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => { setEditingProject(project); setFormOpen(true); }}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <AlertDialogTrigger asChild>
                                                     <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onSetProjectToDelete(project)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                         <div className="text-center py-12 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">The cosmos is empty.</p>
                            <Button className="mt-4" onClick={handleSeedData} disabled={isSeedLoading}>
                                {isSeedLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                Seed Default Projects
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Edit/Add Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
                 <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editingProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                        <DialogDescription>
                            {editingProject?.id ? `Modify the parameters of ${editingProject.name}.` : 'Add a new celestial body to the EmityGate cosmos.'}
                        </DialogDescription>
                    </DialogHeader>
                    <ProjectForm 
                        project={editingProject} 
                        onSave={handleSaveProject} 
                        onCancel={() => { setFormOpen(false); setEditingProject(null); }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};


export default function FounderDashboard() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

    const confirmDeleteProject = async () => {
        if (!firestore || !projectToDelete) return;
        
        try {
            await deleteDoc(doc(firestore, 'projects', projectToDelete.id!));
            toast({ title: "Project removed", description: `${projectToDelete.name} has been removed from the cosmos.`});
        } catch(e: any) {
            toast({ variant: 'destructive', title: "Delete failed", description: e.message });
        } finally {
            setProjectToDelete(null);
        }
    };

    return (
        <AlertDialog>
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
                    <ProjectsTab onSetProjectToDelete={setProjectToDelete} />
                </TabsContent>
            </Tabs>
            
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to proceed?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the project <span className="font-bold text-foreground">{projectToDelete?.name}</span> from the cosmos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setProjectToDelete(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDeleteProject}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    );
}

    