export type BodyLoader = () => Promise<string>;

const FILES = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' }) as Record<string, BodyLoader>;

export interface Chapter {
  id: string;
  number: number;
  slug: string;
  title: string;
  principle: string;
  operationalClass: string;
  threatVector: string;
  body?: BodyLoader;
}

const META: Omit<Chapter, 'body'>[] = [
  { id: 'd00', number: 0, slug: '00_preface',              title: 'The Substrate Problem',      principle: 'Root Substrate',       operationalClass: 'Substrate Audit',       threatVector: 'Unexamined Foundations' },
  { id: 'd01', number: 1, slug: '01_the_rendering_layer',  title: 'The Rendering Layer',        principle: 'Cognitive Rendering',   operationalClass: 'Cognitive Architecture',  threatVector: 'Passive Reception' },
  { id: 'd02', number: 2, slug: '02_frequency_dynamics',   title: 'Frequency Dynamics',         principle: 'Execution Force',       operationalClass: 'Energy Management',      threatVector: 'Low-Grade Active Cycle' },
  { id: 'd03', number: 3, slug: '03_fractal_architecture', title: 'Fractal Architecture',       principle: 'Origin System',        operationalClass: 'Pattern Recognition',     threatVector: 'Scale-Blindness' },
  { id: 'd04', number: 4, slug: '04_phase_architecture',   title: 'Phase Architecture',          principle: 'Evolutionary Phases',  operationalClass: 'Life-Phase Mapping',     threatVector: 'Phase Arrest' },
  { id: 'd05', number: 5, slug: '05_the_cycle_engine',     title: 'The Cycle Engine',          principle: 'Pattern Recurrence',    operationalClass: 'Pattern Completion',      threatVector: 'Cyclic Recurrence' },
  { id: 'd06', number: 6, slug: '06_boundary_systems',    title: 'Boundary Systems',           principle: 'Layered Architecture', operationalClass: 'Perimeter Defense',      threatVector: 'Layer Starvation' },
  { id: 'd07', number: 7, slug: '07_the_sovereign_state',  title: 'The Sovereign State',        principle: 'Conscious Operator',    operationalClass: 'Conscious Evolution',   threatVector: 'Passive Cycling' },
];

export const chapters: Chapter[] = META.map((m) => {
  const key = `../content/${m.slug}.md`;
  return { ...m, body: FILES[key] };
});

export function chapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function adjacent(id: string): { prev?: Chapter; next?: Chapter } {
  const idx = chapters.findIndex((c) => c.id === id);
  return {
    prev: idx > 0 ? chapters[idx - 1] : undefined,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : undefined,
  };
}
