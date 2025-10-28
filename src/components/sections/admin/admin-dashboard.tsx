'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash } from 'lucide-react';

const chartData = [
  { month: 'January', users: 186 },
  { month: 'February', users: 305 },
  { month: 'March', users: 237 },
  { month: 'April', users: 73 },
  { month: 'May', users: 209 },
  { month: 'June', users: 214 },
];

const chartConfig = {
  users: {
    label: 'Users',
    color: 'hsl(var(--primary))',
  },
};

const teamMembers = [
    { id: '1', name: 'Duraa', role: 'Admin', status: 'Active', project: 'EmityGate Core' },
    { id: '2', name: 'Alex', role: 'Core Member', status: 'Active', project: 'Zenix' },
    { id: '3', name: 'Sam', role: 'Employee', status: 'Active', project: 'WaizGPT' },
    { id: '4', name: 'Jess', role: 'Employee', status: 'Inactive', project: 'LedGate' },
];

const roleVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    'Admin': 'destructive',
    'Core Member': 'default',
    'Employee': 'secondary',
};

const AnalyticsTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>User Growth</CardTitle>
      <CardDescription>Monthly new users</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={4} />
            </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

const TeamTab = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Add, edit, or remove team members.</CardDescription>
            </div>
            <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Member</Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teamMembers.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>
                                <Badge variant={roleVariantMap[member.role] || 'outline'}>{member.role}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={member.status === 'Active' ? 'secondary' : 'outline'} className={member.status === 'Active' ? 'text-green-400 border-green-400/50' : ''}>
                                    {member.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{member.project}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive"><Trash className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);


export default function AdminDashboard() {
  return (
    <Tabs defaultValue="analytics" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="team">Team Members</TabsTrigger>
        <TabsTrigger value="projects">Project Monitoring</TabsTrigger>
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
      </TabsList>
      <TabsContent value="analytics" className="mt-4">
        <AnalyticsTab />
      </TabsContent>
      <TabsContent value="team" className="mt-4">
        <TeamTab />
      </TabsContent>
      <TabsContent value="projects" className="mt-4">
          <Card>
              <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
              <CardContent><p>Project monitoring interface coming soon.</p></CardContent>
          </Card>
      </TabsContent>
       <TabsContent value="announcements" className="mt-4">
          <Card>
              <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
              <CardContent><p>Empire-wide announcement system coming soon.</p></CardContent>
          </Card>
      </TabsContent>
    </Tabs>
  );
}
