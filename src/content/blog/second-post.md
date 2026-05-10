---
title: 'Markdown の書き方まとめ'
description: 'ブログ記事を書くときによく使う Markdown 記法をまとめました。'
pubDate: '2026-04-25'
tags: ['Markdown', 'Tips']
category: '技術'
eyecatch: '/imanari-blog/images/thumbnails/thumb-books.jpg'
---

記事を書くときに使う Markdown 記法をまとめておきます。

## 見出し

```markdown
## 大見出し
### 中見出し
#### 小見出し
```

## 文字の装飾

**太字** は `**テキスト**`、*斜体* は `*テキスト*`、~~打ち消し~~ は `~~テキスト~~` で書けます。

## リスト

箇条書き:
- 項目 A
- 項目 B
  - 入れ子にもできます

番号付き:
1. 最初
2. 次
3. 最後

## リンクと画像

[リンクテキスト](https://example.com)

`![代替テキスト](画像のURL)` で画像を挿入できます。

## コードブロック

バッククォート3つで囲むとコードブロックになります。言語名を指定するとシンタックスハイライトが効きます。

```javascript
console.log('Hello, World!');
```

## 引用

> これは引用です。
> `>` を行頭につけます。

---

以上、よく使う記法でした！
