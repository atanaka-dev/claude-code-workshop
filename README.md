# Claude Code Workshop HTML Deck

Claude Codeを使って、GitHub Pagesで公開可能なHTML資料を直接編集するプロジェクトです。
現在はテンプレートから生成する方式ではなく、`dist/` 配下のHTML/CSS/JSを成果物兼編集対象として扱います。

## Outputs

- `dist/index.html`  
  発表用スライド資料

- `dist/notes.html`  
  後読み用の縦スクロール資料

## Source Files

- `dist/index.html`  
  発表用スライド資料の本体

- `dist/notes.html`  
  後読み用の縦スクロール資料の本体

- `dist/assets/`  
  CSS/JSなどの配信アセット

- `docs/brief.md`  
  資料全体の目的、対象読者、制約

- `docs/slides.md`  
  `index.html` 用のスライド単位コンテンツ

- `docs/notes.md`  
  `notes.html` 用の縦スクロール本文

- `docs/references.md`  
  出典・参考リンク

- `DESIGN.md`  
  デザインシステム

- `rules/`  
  制作・検証ルール

## Basic Workflow

```bash
npm run validate
npm run preview
```

`npm run build` は互換性のために残していますが、`dist/` を再生成・上書きしません。
通常の編集では `dist/index.html`、`dist/notes.html`、`dist/assets/` を直接更新してください。

## GitHub Pages

GitHub Pagesでは `dist/` 配下を公開対象にします。

このプロジェクトでは、リポジトリに含まれる `dist/` をそのままGitHub Pagesへデプロイする想定です。

## Important Notes

すべてのCSS、JS、画像は相対パスで参照してください。
社内資料を公開する場合は、GitHub Pagesの公開範囲を必ず確認してください。
Public Pagesに機密情報、顧客名、社内URL、未公開情報を含めないでください。
