import { defineConfig } from 'astro/config';

// GitHub Pages の設定
// YOUR_USERNAME を GitHub のユーザー名に、YOUR_REPO_NAME をリポジトリ名に変更してください
// 例: site: 'https://taro.github.io', base: '/my-blog'
export default defineConfig({
  site: 'https://imanari.github.io',
  base: '/imanari-blog',
  output: 'static',
});
