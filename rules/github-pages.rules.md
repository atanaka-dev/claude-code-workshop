# GitHub Pages Rules

## Purpose

GitHub Pagesで公開しても壊れないHTML資料を作るためのルール。

## Output

- 成果物は `dist/` で直接管理する
- 発表用資料は `dist/index.html`
- 後読み資料は `dist/notes.html`
- アセットは `dist/assets/` に配置する
- `dist/` はGitHub Pagesで配信するためgit管理対象にする

## Path Rules

相対パスを使う。

Good:

```html
<link rel="stylesheet" href="./assets/css/base.css">
<script src="./assets/js/slides.js"></script>
<img src="./assets/images/example.png" alt="example">
```

Bad:

```html
<link rel="stylesheet" href="/assets/css/base.css">
<script src="/assets/js/slides.js"></script>
<img src="/assets/images/example.png" alt="example">
```

## Static Hosting Rules

- サーバーサイド処理に依存しない
- Runtimeで環境変数を必要としない
- DB接続を前提にしない
- ローカルファイルシステムを参照しない
- `dist/` 外のファイルに依存しない
- テンプレートやビルド時の中間ファイルに依存しない

## Asset Rules

- 画像は圧縮する
- 大容量動画は原則置かない
- 外部CDN依存は避ける
- フォントを同梱する場合はライセンスを確認する
- 画像にはalt属性を付ける

## Privacy Rules

以下を含めない。

- APIキー
- トークン
- パスワード
- 個人情報
- 顧客名
- 社内限定URL
- 未公開の売上・契約情報
- 社外秘のシステム構成
- 認証情報
- `.env` の内容

## Deployment Rules

- GitHub Pagesの公開範囲を確認する
- Public Pagesに社内限定情報を置かない
- Private Pagesを使う場合もアクセス権を確認する
- 公開前に `npm run validate` を実行する
