import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ima9036282179-art.github.io',
  base: '/imanari-blog',
  output: 'static',
  integrations: [
    sitemap({
      serialize(item) {
        const url = item.url;

        // トップページ
        if (url.endsWith('/imanari-blog/') || url.endsWith('/imanari-blog')) {
          item.priority = 1.0;
          item.changefreq = 'daily';
          return item;
        }

        // ブログ記事
        if (url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
          return item;
        }

        // タグページ
        if (url.includes('/tags/')) {
          item.priority = 0.4;
          item.changefreq = 'weekly';
          return item;
        }

        // 占い・検索など機能ページ
        item.priority = 0.5;
        item.changefreq = 'monthly';
        return item;
      },
    }),
  ],
});
