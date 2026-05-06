import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ima9036282179-art.github.io',
  base: '/imanari-blog',
  output: 'static',
  integrations: [sitemap()],
});
