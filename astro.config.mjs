import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://kkv2-astro-wiki.vercel.app',
  publicDir: 'public',
  trailingSlash: 'always',
  integrations: [mdx()],
  vite: {
    css: {
      devSourcemap: true,
    },
    build: {
      cssCodeSplit: true,
    },
  },
});
