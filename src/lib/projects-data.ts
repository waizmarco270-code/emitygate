
import type { LucideIcon } from 'lucide-react';
import { Atom, BrainCircuit, Bot, LandPlot, Puzzle, Film, Anchor, Gamepad2, Brain, Wand, PenTool, Link } from 'lucide-react';
import { getOrbitalProperties, type OrbitalTier, type SizePreset } from './orbital-mechanics';

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
  iconImage?: string; // Optional Base64 image
  color: string;
  url: string;
  tier: OrbitalTier,
  sizePreset: SizePreset,
  glowIntensity?: number;
  // Orbit props
  size: number;
  orbit: number;
  angle: number;
  speed: number;
};

type ProjectSeed = Omit<Project, 'size' | 'orbit' | 'angle' | 'speed'>;

const projectSeeds: ProjectSeed[] = [
  {
    id: 'emity-gate-core',
    name: 'EmityGate Core',
    description: 'The central star of the empire, representing the core brand and vision.',
    icon: 'Atom',
    color: 'hsl(260, 100%, 75%)',
    url: '#',
    tier: 'core',
    sizePreset: 'extra-large',
    glowIntensity: 10,
  },
  {
    id: 'zenix',
    name: 'Zenix',
    description: 'Zenix AI Photo & Art Studio: Revolutionizing digital creativity with generative AI, enabling users to produce stunning, unique visual content from simple text prompts.',
    icon: 'Wand',
    color: 'hsl(180, 80%, 60%)',
    url: '#',
    tier: 'inner',
    sizePreset: 'medium',
    glowIntensity: 5,
  },
  {
    id: 'notesgate',
    name: 'NotesGate',
    description: 'A sophisticated AI companion designed to streamline workflows, automate tasks, and provide insightful data analysis for peak efficiency.',
    icon: 'PenTool',
    color: 'hsl(220, 80%, 70%)',
    url: '#',
    tier: 'inner',
    sizePreset: 'large',
    glowIntensity: 5,
  },
  {
    id: 'ledgate',
    name: 'LedGate',
    description: 'LedGate Smart Bill Automation: An intelligent platform for managing and automating financial processes, offering clarity and control over enterprise-level billing.',
    icon: 'Atom',
    color: 'hsl(300, 80%, 70%)',
    url: '#',
    tier: 'outer',
    sizePreset: 'small',
    glowIntensity: 3,
  },
  {
    id: 'mindmate',
    name: 'MindMate',
    description: 'MindMate: An immersive digital realm of interconnected games and experiences, built on the principles of ownership and decentralized identity.',
    icon: 'Brain',
    color: 'hsl(40, 80%, 60%)',
    url: '#',
    tier: 'outer',
    sizePreset: 'large',
    glowIntensity: 5,
  },
  {
    id: 'playgate',
    name: 'PlayGate',
    description: 'PlayGate R&D: The bleeding-edge research division dedicated to pioneering new frontiers in artificial intelligence and next-generation digital defense.',
    icon: 'Gamepad2',
    color: 'hsl(120, 80%, 60%)',
    url: '#',
    tier: 'core',
    sizePreset: 'medium',
    glowIntensity: 7,
  },
];

export const defaultProjects: Project[] = projectSeeds.map(seed => ({
  ...seed,
  ...getOrbitalProperties(seed.tier, seed.sizePreset),
}));
