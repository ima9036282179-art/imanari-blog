---
title: 'GitHub Pages へのデプロイ手順'
description: 'Astro で作ったブログを GitHub Pages に公開する手順を説明します。'
pubDate: '2026-05-05'
tags: ['GitHub', 'デプロイ', 'Tips']
---

このブログを GitHub Pages で公開する手順をメモしておきます。

## 事前準備

1. GitHub アカウントを持っていること
2. Git がインストールされていること

## 手順

### 1. astro.config.mjs を編集する

```js
export default defineConfig({
  site: 'https://あなたのユーザー名.github.io',
  base: '/リポジトリ名',
});
```

### 2. GitHub にリポジトリを作る

GitHub で新しいリポジトリを作成します。

### 3. コードをプッシュする

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git push -u origin main
```

### 4. GitHub Pages を有効にする

リポジトリの **Settings → Pages** を開き、  
**Source** を `GitHub Actions` に変更します。

### 5. 自動デプロイを確認する

`main` ブランチにプッシュすると、GitHub Actions が自動でビルド・デプロイしてくれます。  
**Actions** タブでログを確認できます。

## 完成！

数分後に `https://ユーザー名.github.io/リポジトリ名` でサイトが公開されます。
