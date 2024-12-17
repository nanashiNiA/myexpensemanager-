This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# MyExpenseManager

簡単・効率的に日々の支出を管理するアプリケーション。

## 概要

MyExpenseManagerは、日々の収支を記録し、カレンダー表示やグラフ化を通じて視覚的に管理できる支出管理アプリケーションです。支出データの入力や閲覧を直感的に行えるインターフェースを提供します。Next.jsを使ったモダンなフロントエンドとSupabaseを使った効率的なバックエンド構成で、パフォーマンスと拡張性を両立します。

## 特徴

- **支出データ入力**: 日付、カテゴリ、金額を簡単に記録。
- **カレンダー表示**: 支出の履歴をカレンダー形式で確認可能。
- **グラフ機能**: 月間/年間の収支をグラフ化し、傾向を把握。
- **設定項目**: カテゴリのカスタマイズやデータのエクスポート機能を搭載予定。

## 使用技術

### フロントエンド
- **Next.js**: サーバーサイドレンダリングとクライアントサイドの利便性を併用。
- **React**: ユーザーインターフェースの構築。

### バックエンド
- **Supabase**: リアルタイムデータベース、認証、API構築に使用。

### 開発環境
- **Docker**: ローカル開発環境のコンテナ化。
- その他: **TypeScript**, **TailwindCSS** (UIデザイン用)。


```bash
myexpensemanager/
├── src/                  # ソースコード
│   ├── components/       # 再利用可能なUIコンポーネント
│   │   ├── Calendar.tsx  # カレンダー表示コンポーネント
│   │   ├── Graph.tsx     # グラフ表示コンポーネント
│   │   ├── InputForm.tsx # 入力フォーム
│   │   └── Settings.tsx  # 設定ページ
│   ├── pages/            # Next.jsのページ
│   │   ├── index.tsx     # ホームページ
│   │   ├── settings.tsx  # 設定ページ
│   │   └── api/          # APIエンドポイント
│   ├── styles/           # グローバルスタイル
│   ├── utils/            # ヘルパー関数やユーティリティ
│   └── hooks/            # カスタムフック
├── public/               # 公開用静的ファイル
├── docker-compose.yml    # Docker設定ファイル
├── package.json          # パッケージ管理ファイル
├── .env                  # 環境変数
└── README.md             # プロジェクトの概要
