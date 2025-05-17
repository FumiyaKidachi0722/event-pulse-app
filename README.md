# EventPulse

**EventPulse** は、Next.js 15（App Router）と TypeScript をベースに、クリーンアーキテクチャを適用したフルスタック Web アプリケーションです。
投資情報やニュースデータを自動で収集（スクレイピング）、ETL パイプラインで処理・集計し、shadcn/ui と Tailwind CSS を用いたモダンなダッシュボードで可視化します。

---

## 🚀 主な機能

- **自動データ収集**

  - Puppeteer/Playwright と Cheerio を組み合わせ、競合サイトや SNS のメトリクスを夜間にスクレイピング
  - Vercel Cron Jobs で定期実行

- **ETL パイプライン**

  - Node.js のストリーム API で大量データをチャンク処理（抽出・変換・ロード）
  - Firebase Firestore に生データと集計結果を保存

- **インタラクティブダッシュボード**

  - Recharts/Chart.js で折れ線グラフ・棒グラフを描画
  - Next.js の App Router と `use client` コンポーネントで動的フィルタ・ツールチップを実装

- **認証・セキュリティ**

  - Firebase Authentication（メール／SNS ログイン）
  - Firestore Security Rules で読み書きを制御

- **クリーンアーキテクチャ**

  - Domain／UseCase／Infrastructure／Presentation のレイヤー分離で保守性・テスト容易性を向上

- **モダン UI コンポーネント**

  - shadcn/ui と Tailwind CSS でアクセシブルかつ再利用可能な Button, Dialog, DataTable などを提供

- **無償インフラ**

  - Firebase Spark プランと Vercel 無料枠のみでバックエンド・ホスティングを実現

---

## 🛠 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4, shadcn/ui
- **バックエンド**: Node.js ストリーム, Next.js API Routes, Firebase Firestore/Functions
- **認証**: Firebase Authentication
- **CI/CD**: Vercel (プレビュー & 本番 自動デプロイ), GitHub Actions (lint, test, build)
- **テスト**: Vitest, React Testing Library, Supertest, Playwright/Cypress
- **監視**: Vercel Analytics, Sentry (無料プラン)

---

## 📋 必要環境

- Node.js v18 以上
- npm v10 以上
- Firebase プロジェクト (Firestore / Auth)
- Vercel アカウント (ホスティング & Cron Jobs)

---

## ⚙️ インストールおよびセットアップ

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/your-org/event-pulse-app.git
   cd event-pulse-app
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境変数を設定**

   - `.env.example` をコピーして `.env.local` を作成し、以下を入力

     ```ini
     NEXT_PUBLIC_FIREBASE_API_KEY=...
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
     FIREBASE_CLIENT_EMAIL=...
     ```

4. **Firebase 初期化**

   ```bash
   npx firebase login
   npx firebase init firestore functions hosting
   ```

   - Firestore のルールとインデックスを設定

5. **開発サーバーを起動**

   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開く

---

## 📦 スクリプト一覧

| コマンド        | 説明                                |
| --------------- | ----------------------------------- |
| `npm run dev`   | 開発サーバーを起動 (Turbopack 有効) |
| `npm run build` | 本番用ビルド                        |
| `npm run start` | 本番サーバーを起動                  |
| `npm run lint`  | ESLint 実行                         |
| `npm run test`  | Vitest でテスト実行                 |

---

## 📂 フォルダ構成

```plaintext
src/
├── apps/
│   ├── web/            # Next.js App Router (UI & ページ)
│   └── api/            # Next.js API Routes & Functions
├── components/         # shadcn/ui や機能別コンポーネント
├── libs/
│   ├── domain/         # エンティティ & 値オブジェクト
│   ├── usecases/       # ユースケースロジック
│   ├── infra/          # リポジトリ & 外部クライアント実装
│   └── shared/         # ユーティリティ & ヘルパー
├── styles/
│   └── globals.css     # Tailwind インポート & カスタムスタイル
└── public/             # 静的アセット (画像 等)
```

---

## 🤖 CI/CD

- **Vercel**: PR ごとにプレビュー、自動デプロイ
- **GitHub Actions**: プルリクエスト時に lint → type-check → test → build を実行

---

## ✅ テスト戦略

- **ユニットテスト**: Vitest による Domain/UseCase 層の検証
- **コンポーネントテスト**: React Testing Library で UI を検証
- **API テスト**: Supertest で API Routes を確認
- **E2E テスト**: Playwright/Cypress でプレビュー環境を操作
