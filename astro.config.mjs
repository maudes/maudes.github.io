import { defineConfig } from 'astro/config';

// Old MkDocs URLs (maudes.github.io/tech-notes and /cv, now /resume) -> new site.
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
    '/cv': '/resume',
    '/cv/experience': '/resume/#experience',
    '/cv/education_skills': '/resume/#skills',
    '/cv/portfolio': '/resume/#portfolio',
    '/cv/projects/wiz': '/resume/wiz',
    '/cv/projects/igaming': '/resume/igaming',
    '/cv/projects/wiz_local': '/resume/wiz-local',
    '/cv/projects/carepilot': '/resume/carepilot',
    '/cv/projects/joblens': '/resume/joblens',
    '/cv/projects/smallsomebody': '/resume/smallsomebody',
    '/cv/projects/salasusu': '/resume/salasusu',
    // briefly live at /cv/<slug> before the rename
    '/cv/wiz': '/resume/wiz',
    '/cv/igaming': '/resume/igaming',
    '/cv/wiz-local': '/resume/wiz-local',
    '/cv/carepilot': '/resume/carepilot',
    '/cv/joblens': '/resume/joblens',
    '/cv/smallsomebody': '/resume/smallsomebody',
    '/cv/salasusu': '/resume/salasusu',
};

export default defineConfig({
  site: 'https://maudes.github.io',
  redirects,
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
  },
});
