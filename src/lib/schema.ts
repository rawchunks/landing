/**
 * SCHEMA DEFINITIONS
 * STRICT RULES:
 * - Single-word files (schema.ts)
 * - Single-word types (Song, Track, Stem, Region, Prompt, User, Project, Job, etc.)
 * - Single-word databases (songs, users, generations, stems, edits, presets, projects, tags)
 * - Zero versioning (no v1, v2)
 * - Zero name prefixes
 */

export interface Stem {
  id: string;
  name: 'vocals' | 'drums' | 'bass' | 'instruments';
  url: string;
  volume: number;
  muted: boolean;
  solo: boolean;
}

export interface Region {
  id: string;
  start: number;
  end: number;
  prompt: string;
  lyrics: string;
  applied: boolean;
}

export interface Song {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  lyrics: string;
  duration: number;
  url: string;
  cover: string;
  created: number;
  stems: Stem[];
  edits: Region[];
}

export interface Track {
  id: string;
  song: Song;
  variation: 1 | 2;
  status: 'queued' | 'synthesizing' | 'ready' | 'error';
  progress: number;
}

export interface Prompt {
  text: string;
  tags: string[];
  lyrics: string;
  instrumental: boolean;
  custom: boolean;
  tempo?: number;
  key?: string;
}

export interface User {
  id: string;
  handle: string;
  credits: number;
  tier: 'free' | 'pro' | 'unlimited';
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  songs: Song[];
  created: number;
  updated: number;
}

export interface Job {
  id: string;
  type: 'generate' | 'inpaint' | 'extend' | 'stems';
  status: 'pending' | 'processing' | 'done' | 'failed';
  track: string;
  progress: number;
  created: number;
}

export interface Preset {
  id: string;
  name: string;
  tags: string[];
  bpm: number;
  description: string;
}

export interface Wave {
  peaks: number[];
  duration: number;
  channels: number;
  sampleRate: number;
}

export interface Tag {
  id: string;
  name: string;
  category: 'genre' | 'mood' | 'tempo' | 'timbre' | 'instrument';
}

export interface Section {
  name: string;
  start: number;
  end: number;
}

export type Mode = 'simple' | 'custom' | 'inpaint';
export type Action = 'play' | 'pause' | 'seek' | 'inpaint' | 'extend' | 'split';
export type Model = 'standard' | 'high' | 'experimental';

/* SINGLE-WORD DATABASES */
export interface Database {
  songs: Map<string, Song>;
  users: Map<string, User>;
  generations: Map<string, Track>;
  stems: Map<string, Stem>;
  edits: Map<string, Region>;
  presets: Map<string, Preset>;
  projects: Map<string, Project>;
  tags: Map<string, Tag>;
}
