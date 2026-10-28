import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ title: z.string(), date: z.coerce.date(), categories: z.array(z.string()), draft: z.boolean().default(false) }),
});

const pair = z.tuple([z.string(), z.string()]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    group: z.string(),
    order: z.number(),
    description: z.string(),
    cover: z.string(),
    thumb: z.string(),
    tags: z.array(z.string()),
    glance: z.array(pair).default([]),
    lead: z.string().optional(),
    why: z.object({ title: z.string(), body: z.array(z.string()) }).optional(),
    callout: z.object({ title: z.string(), body: z.string().optional(), items: z.array(z.string()).default([]) }).optional(),
    team: z.array(pair).default([]),
    stack: z.array(pair).default([]),
    challenges: z.array(pair).default([]),
    contributions: z.array(pair).default([]),
    decisions: z.array(pair).default([]),
    phases: z.array(z.tuple([z.string(), z.array(z.string())])).default([]),
    structure: z.string().optional(),
    repo: z.object({ label: z.string(), url: z.string() }).optional(),
    video: z.string().optional(),
    gallery: z.array(z.object({ img: z.string(), caption: z.string(), tag: z.string() })).default([]),
  }),
});

export const collections = { blog, projects };
