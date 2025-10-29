
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart as BarChartIcon, FileText, Globe, Users, Waypoints, Link as LinkIcon, Pencil, Trash2, PlusCircle, HardDrive, Terminal, Settings, ListTodo, BrainCircuit, Sparkles, ShieldQuestion, UserCog } from "lucide-react";
import { Bar, BarChart as RechartsBar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser, useCollection, useFirestore } from "@/firebase";
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
import { useFounderConsole } from '@/context/founder-console-context';
import Image from 'next/image';
import { updateUserRoleAction } from '@/lib/actions';
import { processFounderLog, type ProcessFounderLogOutput } from '@/ai/flows/process-founder-log';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';


const engagementData = [
    { name: 'Zenix', value: 4000 },
    { name: 'NotesGate', value: 3000 },
    { name: 'LedGate', value: 2000 },
    { name: 'MindMate', value: 2780 },
    { name: 'PlayGate', value: 1890 },
];

const FounderLog = () => {
    const { setIsConsoleOpen } = useFounderConsole();
    const [logEntry, setLogEntry] = useState('');
    const [analysis, setAnalysis] = useState<ProcessFounderLogOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleProcessLog = async () => {
        if (!logEntry.trim()) {
            toast({ variant: 'destructive', title: 'Log is empty', description: 'You must write something to commit to the log.'});
            return;
        }
        setIsLoading(true);
        setAnalysis(null);
        try {
            const result = await processFounderLog({ logEntry });
            setAnalysis(result);
            toast({ title: 'Log Processed', description: 'Kairos has analyzed your entry.'});
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Analysis Failed', description: e.message });
        }
        setIsLoading(false);
    }

    return (
        <Card className="lg:col-span-2">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Founder's Log
                </CardTitle>
                <CardDescription>A secure, AI-powered channel for your eyes only, Founder.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {analysis ? (
                   <div className="space-y-4 animate-page-enter">
                        <Card>
                            <CardHeader><CardTitle className="text-lg">Log Summary</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">{analysis.summary}</p></CardContent>
                        </Card>
                         <div className="grid grid-cols-2 gap-4">
                             <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ListTodo /> Action Items</CardTitle></CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                        {analysis.actionItems.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                              <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BrainCircuit /> Sentiment</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="font-headline text-2xl text-primary">{analysis.sentiment}</p>
                                </CardContent>
                            </Card>
                         </div>
                        <Button variant="outline" onClick={() => setAnalysis(null)} className="w-full">New Log Entry</Button>
                   </div>
               ) : (
                <>
                    <Textarea 
                        placeholder="Record your thoughts, strategies, and directives..." 
                        rows={6}
                        value={logEntry}
                        onChange={(e) => setLogEntry(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex gap-2">
                        <Button onClick={handleProcessLog} className="w-full" disabled={isLoading}>
                           {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            Commit to Log
                        </Button>
                        <Button onClick={() => setIsConsoleOpen(true)} variant="secondary">
                            <Terminal />
                        </Button>
                    </div>
                </>
               )}
            </CardContent>
        </Card>
    )
}

const OverviewTab = () => {
    const firestore = useFirestore();
    const projectsQuery = firestore ? collection(firestore, 'projects') : null;
    const { data: projectsData } = useCollection<Project>(projectsQuery);

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 border-primary/20 hover:border-primary/50 transition-all">
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
                <div className="text-4xl font-bold font-headline">{projectsData ? projectsData.filter(p=>p.id !== 'emity-gate-core').length : <Loader2 className="h-8 w-8 animate-spin" />}</div>
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

        <FounderLog />
    </div>
)};

const TeamMembersTab = ({ onSetRoleToUpdate }: { onSetRoleToUpdate: (user: UserProfile, role: 'founder' | 'admin' | 'user') => void }) => {
    const firestore = useFirestore();
    const usersQuery = firestore ? collection(firestore, 'users') : null;
    const { data: users, loading, error } = useCollection<UserProfile>(usersQuery);

    const getUserRole = (user: UserProfile) => {
        if (user.isFounder) return 'founder';
        if (user.isAdmin) return 'admin';
        return 'user';
    }

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
                            <TableHead className="text-right">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map(user => {
                            const currentRole = getUserRole(user);
                            return (
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
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <span className="capitalize">{currentRole}</span>
                                                    <UserCog className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => onSetRoleToUpdate(user, 'user')}>User</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onSetRoleToUpdate(user, 'admin')}>Admin</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onSetRoleToUpdate(user, 'founder')}>Founder</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
};

const ProjectForm = ({ project, onSave, onCancel }: { project?: Partial<Project> | null, onSave: (project: Partial<Project>) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Partial<Project>>({
      name: '',
      description: '',
      icon: 'Link',
      color: 'hsl(207, 90%, 40%)',
      url: '',
      tier: 'inner',
      sizePreset: 'medium',
      glowIntensity: 5,
      ...project,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSliderChange = (name: string) => (value: number[]) => {
        setFormData(prev => ({ ...prev, [name]: value[0] }));
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, iconImage: reader.result as string }))
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }
    
    const isCoreProject = project?.id === 'emity-gate-core';

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isCoreProject} />
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
                <Label htmlFor="iconImage">{isCoreProject ? 'Sun Core Image' : 'Icon Image'}</Label>
                <Input id="iconImage" name="iconImage" type="file" onChange={handleFileChange} accept="image/*" />
                 {formData.iconImage && <div className="w-16 h-16 mt-2 relative"><Image src={formData.iconImage} alt="icon preview" layout="fill" objectFit="cover" className="rounded-md"/></div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="icon">Fallback Icon (if no image)</Label>
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
                <Label htmlFor="color">Planet/Sun Color (HSL)</Label>
                <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="tier">Orbital Tier</Label>
                <Select name="tier" value={formData.tier} onValueChange={handleSelectChange('tier')} disabled={isCoreProject}>
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
                <Select name="sizePreset" value={formData.sizePreset} onValueChange={handleSelectChange('sizePreset')} disabled={isCoreProject}>
                    <SelectTrigger><SelectValue placeholder="Select a size" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                 <Label htmlFor="glowIntensity">Glow Intensity ({formData.glowIntensity})</Label>
                <Slider id="glowIntensity" name="glowIntensity" value={[formData.glowIntensity || 5]} onValueChange={handleSliderChange('glowIntensity')} max={10} step={1} />
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
        
        const isCoreProject = projectData.id === 'emity-gate-core';
        const orbitalProperties = isCoreProject ? { orbit: 0, speed: 0, angle: 0, size: 192 } : getOrbitalProperties(projectData.tier, projectData.sizePreset);

        const projectToSave: Omit<Project, 'id'> = {
            name: projectData.name!,
            description: projectData.description!,
            icon: projectData.icon!,
            iconImage: projectData.iconImage || '',
            color: projectData.color!,
            url: projectData.url!,
            tier: projectData.tier!,
            sizePreset: projectData.sizePreset!,
            glowIntensity: projectData.glowIntensity || 5,
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
                     <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => { setEditingProject(null); setFormOpen(true); }}><PlusCircle /> Add Project</Button>
                    </div>
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
                                    const isCoreProject = project.id === 'emity-gate-core';
                                    return (
                                        <TableRow key={project.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: project.color }}>
                                                        {project.iconImage ? (
                                                            <Image src={project.iconImage} alt={project.name} layout="fill" objectFit="cover" />
                                                        ) : (
                                                            <Icon className="w-5 h-5 text-white" />
                                                        )}
                                                    </div>
                                                    <span className="font-medium">{project.name}</span>
                                                    {isCoreProject && <Badge>Sun</Badge>}
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
                                                {!isCoreProject && (
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onSetProjectToDelete(project)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                )}
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
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [roleToUpdate, setRoleToUpdate] = useState<{ user: UserProfile; role: 'founder' | 'admin' | 'user' } | null>(null);
    const [isRoleUpdateLoading, setRoleUpdateLoading] = useState(false);

    const handleSetRoleToUpdate = (user: UserProfile, role: 'founder' | 'admin' | 'user') => {
        setRoleToUpdate({ user, role });
    };

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
    
    const confirmUpdateRole = async () => {
        if (!user || !roleToUpdate) return;
        setRoleUpdateLoading(true);

        const result = await updateUserRoleAction({
            targetUserId: roleToUpdate.user.uid,
            role: roleToUpdate.role,
            currentUserId: user.uid,
        });

        if (result.success) {
            toast({ title: 'Role Updated', description: `${roleToUpdate.user.displayName || roleToUpdate.user.email}'s role has been changed to ${roleToUpdate.role}.`});
        } else {
            toast({ variant: 'destructive', title: 'Role Update Failed', description: result.error });
        }
        
        setRoleUpdateLoading(false);
        setRoleToUpdate(null);
    };

    return (
        <AlertDialog>
            <Tabs defaultValue="overview" className="w-full animate-page-enter">
                <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="projects">Constellation</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <OverviewTab />
                </TabsContent>
                <TabsContent value="team">
                    <TeamMembersTab onSetRoleToUpdate={handleSetRoleToUpdate} />
                </TabsContent>
                <TabsContent value="projects">
                    <ProjectsTab onSetProjectToDelete={setProjectToDelete} />
                </TabsContent>
            </Tabs>
            
            {/* Delete Project Dialog */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to proceed?</AlertDialogTitle>
                    {projectToDelete && (
                         <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove the project <span className="font-bold text-foreground">{projectToDelete?.name}</span> from the cosmos.
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setProjectToDelete(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDeleteProject}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

            {/* Update Role Dialog */}
            <Dialog open={!!roleToUpdate} onOpenChange={() => setRoleToUpdate(null)}>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><ShieldQuestion /> Confirm Emperor's Decree</DialogTitle>
                        <DialogDescription>
                            You are about to change the role of <span className="font-bold text-foreground">{roleToUpdate?.user.displayName || roleToUpdate?.user.email}</span> to <span className="font-bold text-foreground capitalize">{roleToUpdate?.role}</span>.
                            This will grant or revoke significant permissions.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setRoleToUpdate(null)} disabled={isRoleUpdateLoading}>Cancel</Button>
                        <Button onClick={confirmUpdateRole} disabled={isRoleUpdateLoading}>
                            {isRoleUpdateLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Confirm Decree
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </AlertDialog>
    );
}

    