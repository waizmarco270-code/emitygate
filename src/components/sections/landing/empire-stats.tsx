'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Rocket, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, unit, duration = 2000 }: { icon: React.ElementType, title: string, value: number, unit: string, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMilSecDur = duration;
    let incrementTime = (totalMilSecDur / end) * 0.5;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <Card className="bg-card/50 border-white/10 backdrop-blur-sm transition-all hover:border-primary/50 hover:glow-primary hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-headline">
          {count.toLocaleString()}
          <span className="ml-2 text-2xl font-body text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const EmpireStats = () => {
  const stats = [
    {
      icon: Users,
      title: 'Total Users',
      value: 12573049,
      unit: '+',
    },
    {
      icon: Rocket,
      title: 'Projects Launched',
      value: 5,
      unit: 'major',
    },
    {
      icon: Activity,
      title: 'Active Modules',
      value: 42,
      unit: 'live',
    },
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl">Empire Overview</h2>
        <p className="text-muted-foreground mt-2">Real-time status of the EmityGate ecosystem.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default EmpireStats;
