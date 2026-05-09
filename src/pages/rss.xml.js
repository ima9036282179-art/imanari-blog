import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Dragon Blog — ドラゴン桜2から学ぶ、勉強と人生のヒント',
    description: 'ドラゴン桜2の名言・全話レビュー・勉強法・キャラクター解説を発信するブログです。',
    site: context.site,
    items: sorted.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags ?? [],
    })),
    customData: `<language>ja</language>`,
  });
}
