import { Layers, Star, Briefcase, Building, Globe, Shield } from 'lucide-react';

// Replace with your actual AES Team names
export const AGENTS = ['Emmanuel', 'Iranlade', 'Kingsley'];

export const TIERS = [
  { id: 't1', name: 'Tier 1', color: 'from-amber-400 to-orange-500', icon: Star, shadow: 'shadow-amber-500/30' },
  { id: 't2', name: 'Tier 2', color: 'from-orange-500 to-red-500', icon: Shield, shadow: 'shadow-orange-500/30' },
  { id: 't3', name: 'Tier 3', color: 'from-blue-500 to-indigo-600', icon: Building, shadow: 'shadow-blue-500/30' },
  { id: 't4', name: 'Tier 4', color: 'from-indigo-600 to-purple-600', icon: Briefcase, shadow: 'shadow-indigo-500/30' },
  { id: 't5', name: 'Tier 5', color: 'from-purple-600 to-fuchsia-600', icon: Globe, shadow: 'shadow-purple-500/30' },
  { id: 't6', name: 'Tier 6', color: 'from-slate-600 to-slate-800', icon: Layers, shadow: 'shadow-slate-500/30' },
];