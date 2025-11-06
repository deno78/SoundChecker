# SoundChecker
簡易的に音量を測るためのアプリ

## 概要

SoundCheckerは、Ionicフレームワークを使用したWebアプリケーションです。デバイスのマイクを使って周囲の音量をリアルタイムで測定できます。

## 機能

- リアルタイムの音量測定
- 視覚的な音量レベル表示（プログレスバー付き）
- 音量に応じた色分け表示（静か/普通/うるさい）
- レスポンシブデザイン

## セットアップ

### 必要な環境

- Node.js 20.x 以上
- npm 10.x 以上

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

ブラウザで `http://localhost:8100` にアクセスしてアプリケーションを確認できます。

### ビルド

```bash
# プロダクションビルド（GitHub Pages用）
npm run build:prod

# 通常のビルド
npm run build
```

ビルドされたファイルは `www` ディレクトリに出力されます。

## GitHub Pagesへのデプロイ

このプロジェクトは、GitHub Actionsを使用して自動的にGitHub Pagesにデプロイされます。

### 初回セットアップ

1. GitHubリポジトリの「Settings」→「Pages」に移動
2. 「Source」を「GitHub Actions」に設定
3. `main` ブランチにプッシュすると自動的にデプロイが開始されます

### デプロイの流れ

1. `main` ブランチにコードをプッシュ
2. GitHub Actionsが自動的にビルドを実行
3. ビルドが成功するとGitHub Pagesにデプロイ
4. `https://<username>.github.io/SoundChecker/` でアプリケーションが公開されます

## 技術スタック

- **フレームワーク**: Ionic 8
- **フロントエンド**: Angular 20
- **スタイリング**: SCSS
- **デプロイ**: GitHub Pages + GitHub Actions

## 使い方

1. アプリケーションを開く
2. 「測定開始」ボタンをクリック
3. マイクへのアクセスを許可
4. リアルタイムで音量レベルが表示されます
5. 「測定停止」ボタンで測定を終了

## ライセンス

MITライセンス
