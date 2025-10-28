
import type { LucideIcon } from 'lucide-react';
import { Atom, BrainCircuit, Bot, LandPlot, Puzzle, Film, Anchor, Gamepad2, Brain, Wand, PenTool, Link } from 'lucide-react';

export const ICONS: { [key: string]: LucideIcon } = {
  Atom,
  BrainCircuit,
  Bot,
  LandPlot,
  Puzzle,
  Film,
  Anchor,
  Gamepad2,
  Brain,
  Wand,
  PenTool,
  Link,
};


export type Project = {
  id?: string;
  name: string;
  description:string;
  icon: string;
  color: string;
  url: string;
  // Orbit props
  size: number;
  orbit: number;
  angle: number;
  speed: number;
};

export const defaultProjects: Project[] = [
  {
    id: 'zenix',
    name: 'Zenix',
    description: 'Zenix AI Photo & Art Studio: Revolutionizing digital creativity with generative AI, enabling users to produce stunning, unique visual content from simple text prompts.',
    icon: 'Wand',
    color: 'hsl(180, 80%, 60%)',
    url: '#',
    size: 60,
    orbit: 180,
    angle: 30,
    speed: 0.8,
  },
  {
    id: 'notesgate',
    name: 'NotesGate',
    description: 'A sophisticated AI companion designed to streamline workflows, automate tasks, and provide insightful data analysis for peak efficiency.',
    icon: 'PenTool',
    color: 'hsl(220, 80%, 70%)',
    url: '#',
    size: 80,
    orbit: 280,
    angle: 110,
    speed: 0.6,
  },
  {
    id: 'ledgate',
    name: 'LedGate',
    description: 'LedGate Smart Bill Automation: An intelligent platform for managing and automating financial processes, offering clarity and control over enterprise-level billing.',
    icon: 'Atom',
    color: 'hsl(300, 80%, 70%)',
    url: '#',
    size: 50,
    orbit: 220,
    angle: 190,
    speed: 0.7,
  },
  {
    id: 'mindmate',
    name: 'MindMate',
    description: 'MindMate: An immersive digital realm of interconnected games and experiences, built on the principles of ownership and decentralized identity.',
    icon: 'Brain',
    color: 'hsl(40, 80%, 60%)',
    url: '#',
    size: 90,
    orbit: 360,
    angle: 260,
    speed: 0.5,
  },
  {
    id: 'playgate',
    name: 'PlayGate',
    description: 'PlayGate R&D: The bleeding-edge research division dedicated to pioneering new frontiers in artificial intelligence and next-generation digital defense.',
    icon: 'Gamepad2',
    color: 'hsl(120, 80%, 60%)',
    url: '#',
    size: 70,
    orbit: 320,
    angle: 330,
    speed: 0.65,
  },
  {
    id: 'glowphy',
    name: 'GlowPhy',
    description: 'A new project.',
    icon: 'Film',
    color: 'hsl(270, 70%, 75%)',
    url: '#',
    size: 65,
    orbit: 250,
    angle: 70,
    speed: 0.9,
  },
  {
    id: 'marcoai',
    name: 'Marco Ai',
    description: 'The central intelligence of the EmityGate empire.',
    icon: 'BrainCircuit',
    color: 'hsl(30, 100%, 50%)',
    url: '#',
    size: 100,
    orbit: 400,
    angle: 150,
    speed: 0.4,
  },
];
