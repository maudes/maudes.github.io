import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://maudes.github.io',
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
  },
});
