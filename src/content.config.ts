import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ title: z.string(), date: z.coerce.date(), categories: z.array(z.string()) }),
});

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
    gallery: z.array(z.object({ img: z.string(), caption: z.string(), tag: z.string() })).default([]),
  }),
});

export const collections = { blog, projects };
