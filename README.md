# demo-subsc-learning-site

React + TypeScript + Viteを使用したサブスクリプション学習サイトのデモプロジェクトです。

## 技術スタック

- **フロントエンド**: React 18.3.1
- **言語**: TypeScript 5.5.3
- **ビルドツール**: Vite 5.4.2
- **スタイリング**: Tailwind CSS 3.4.1
- **ルーティング**: React Router DOM 7.7.0
- **アイコン**: Lucide React 0.344.0
- **リンター**: ESLint 9.9.1

## 前提条件

以下のソフトウェアがインストールされている必要があります：

- **Node.js**: バージョン 18.0.0 以上
- **npm**: バージョン 9.0.0 以上（Node.jsと一緒にインストールされます）

## ローカル開発環境のセットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd demo-subsc-learning-site
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動すると、通常は `http://localhost:5173` でアプリケーションにアクセスできます。

### 4. ブラウザで確認

ブラウザで `http://localhost:5173` を開いて、アプリケーションが正常に動作することを確認してください。

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動（ホットリロード対応）
- `npm run build` - 本番用ビルドを作成
- `npm run preview` - ビルドされたアプリケーションをプレビュー
- `npm run lint` - ESLintでコードの品質チェック

## プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── Completion.tsx   # 完了ページ
│   ├── CourseDetail.tsx # コース詳細ページ
│   ├── CourseList.tsx   # コース一覧ページ
│   ├── LandingPage.tsx  # ランディングページ
│   ├── Layout.tsx       # レイアウトコンポーネント
│   ├── PricingPage.tsx  # 料金ページ
│   ├── ProfilePage.tsx  # マイページ
│   └── Quiz.tsx         # クイズページ
├── data/               # モックデータ
│   └── mockData.ts
├── types/              # TypeScript型定義
│   └── index.ts
├── App.tsx             # メインアプリケーションコンポーネント
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

## 開発のヒント

- ファイルを保存すると自動的にホットリロードされます
- TypeScriptの型チェックがリアルタイムで行われます
- ESLintの設定により、コードの品質が自動的にチェックされます
- Tailwind CSSを使用してスタイリングを行っています

## トラブルシューティング

### 依存関係のエラーが発生する場合

```bash
rm -rf node_modules package-lock.json
npm install
```

### ポート5173が使用中の場合

Viteは自動的に別のポートを探して使用します。ターミナルの出力を確認してください。

### TypeScriptエラーが発生する場合

```bash
npm run lint
```

を実行して、具体的なエラー内容を確認してください。

## 本番ビルド

本番環境にデプロイする場合は、以下のコマンドでビルドしてください：

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

## Netlifyへのデプロイ

### 方法1: Netlify CLIを使用

1. **Netlify CLIをインストール**
```bash
npm install -g netlify-cli
```

2. **Netlifyにログイン**
```bash
netlify login
```

3. **プロジェクトを初期化**
```bash
netlify init
```

4. **デプロイ**
```bash
netlify deploy --prod
```

### 方法2: Netlify UIを使用

1. **GitHubにプッシュ**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Netlifyでサイトを作成**
   - [Netlify](https://netlify.com)にアクセス
   - 「New site from Git」をクリック
   - GitHubリポジトリを選択
   - 以下の設定を確認：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 「Deploy site」をクリック

### 方法3: ドラッグ&ドロップ

1. **プロジェクトをビルド**
```bash
npm run build
```

2. **distフォルダをNetlifyにドラッグ&ドロップ**
   - [Netlify](https://app.netlify.com/drop)にアクセス
   - `dist`フォルダをドラッグ&ドロップ

## デプロイ後の設定

### カスタムドメインの設定

1. Netlifyダッシュボードでサイトを選択
2. 「Domain settings」タブをクリック
3. 「Add custom domain」をクリック
4. ドメイン名を入力して設定

### 環境変数の設定

必要に応じて、Netlifyダッシュボードの「Environment variables」で環境変数を設定できます。

## 注意事項

- React Routerを使用しているため、SPA用のリダイレクト設定が含まれています
- `netlify.toml`ファイルでビルド設定を管理しています
- 本番環境では、実際のAPIエンドポイントに接続するように設定を変更してください
