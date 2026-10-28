import { defineConfig } from 'astro/config';

// Old MkDocs URLs (maudes.github.io/tech-notes and /cv) -> new site.
const redirects = {
    '/tech-notes/blog/2026/03/08/case-study-matter-from-brand-to-ecosystem': '/blog/case-study-matter-from-brand-to-ecosystem',
    '/tech-notes/blog/2026/03/08/case-study-matter-from-protocol-to-product': '/blog/case-study-matter-from-protocol-to-product',
    '/tech-notes/blog/2026/02/09/hello-world-its-maude-from-taiwan': '/',
    '/tech-notes/blog/2026/02/20/network-101-the-brain-of-cpes': '/blog/network-101-the-brain-of-cpes',
    '/tech-notes/blog/2026/02/27/network-101-the-connected-life': '/blog/network-101-the-connected-life',
    '/tech-notes/blog/2026/02/14/network-101-the-foundation': '/blog/network-101-the-foundation',
    '/tech-notes/blog/2026/02/18/network-101-the-wireless-era': '/blog/network-101-the-wireless-era',
    '/tech-notes/blog/2026/05/10/openshare-matter-in-a-nutshell-q126': '/blog/openshare-matter-in-a-nutshell-q126',
    '/tech-notes': '/',
    '/tech-notes/blog': '/',
    '/tech-notes/others': '/',
    '/tech-notes/blog/archive': '/',
    '/tech-notes/blog/category': '/',
    '/cv/experience': '/cv/#experience',
    '/cv/education_skills': '/cv/#skills',
    '/cv/portfolio': '/cv/#portfolio',
    '/cv/projects/wiz': '/cv/wiz',
    '/cv/projects/igaming': '/cv/igaming',
    '/cv/projects/wiz_local': '/cv/wiz-local',
    '/cv/projects/carepilot': '/cv/carepilot',
    '/cv/projects/joblens': '/cv/joblens',
    '/cv/projects/smallsomebody': '/cv/smallsomebody',
    '/cv/projects/salasusu': '/cv/salasusu',
};

export default defineConfig({
  site: 'https://maudes.github.io',
  redirects,
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
  },
});
