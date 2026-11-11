import type { ImageMetadata } from 'astro';

// Project images live in src/assets/resume/ so astro:assets can resize them.
// Pages refer to them by file name (frontmatter `cover`, `thumb`, gallery `img`).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/resume/*.{webp,jpg,jpeg,png}', { eager: true });

export function resumeImage(name: string): ImageMetadata {
  const file = files[`../assets/resume/${name}`];
  if (!file) throw new Error(`Missing image: src/assets/resume/${name}`);
  return file.default;
}

// `sizes` hints matching the layout in resume.astro and project.css.
export const sizes = {
  card: '(max-width: 800px) calc(100vw - 48px), 334px',
  hero: '(max-width: 860px) calc(100vw - 48px), 812px',
  gallery: '(max-width: 760px) calc(100vw - 48px), 398px',
};
export const widths = {
  card: [400, 700, 1000],
  hero: [600, 900, 1200, 1600],
  gallery: [400, 800, 1200],
};
