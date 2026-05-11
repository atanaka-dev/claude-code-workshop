---
name: html-slide-deck
description: GitHub Pages向けのHTMLスライドと後読み資料をdist配下で直接作成・更新する
---

# HTML Slide Deck Workflow

## Purpose

このスキルは、`dist/` 配下の完成HTML/CSS/JSを直接編集して、以下の2つのHTMLを作成・更新する。
`docs/` のMarkdownは内容・構成の参照元であり、テンプレートからHTMLを再生成する前提にはしない。

- `dist/index.html`: 発表用スライド
- `dist/notes.html`: 後読み用の縦スクロール資料

## Inputs

必ず以下を確認する。

1. `docs/brief.md`
2. `dist/index.html`
3. `dist/notes.html`
4. `dist/assets/`
5. `docs/slides.md`
6. `docs/notes.md`
7. `docs/references.md`
8. `DESIGN.md`
9. `rules/*.md`
10. `docs/ai/current-state.md`

## Workflow

### Step 1: Understand Brief

`docs/brief.md` から以下を抽出する。

- 目的
- 対象読者
- 期待成果
- 制約
- トーン
- 成果物

### Step 2: Review Slide HTML

`dist/index.html` を読み、発表用スライドとして以下を確認する。

- 1スライド1メッセージになっているか
- 画面投影で読める密度か
- `docs/slides.md` のSlide単位と内容が対応しているか
- CSS/JS/画像が相対パスで参照されているか

必要に応じて `docs/slides.md` を参照し、スライドの意図を確認する。

`docs/slides.md` を編集した場合も、自動生成には頼らず、`dist/index.html`へ必要な変更を反映する。

### Step 3: Review Notes HTML

`dist/notes.html` を読み、縦スクロール資料として自然な構成にする。
必要に応じて `docs/notes.md` を参照し、内容の過不足を確認する。

必ず目次を作る。

### Step 4: Apply Design

`DESIGN.md` に従って、色、余白、フォントサイズ、レイアウトを統一する。

勝手に新しい色や装飾を増やさない。

### Step 5: Generate Files

以下を直接更新する。

- `dist/index.html`
- `dist/notes.html`
- `dist/assets/css/*.css`
- `dist/assets/js/*.js`
- 必要な画像アセット

`templates/` 配下のファイルは旧生成方式の名残として扱い、通常作業では編集対象にしない。
`scripts/build.mjs` は旧生成方式そのものだったため、このワークフローでは使わない。
`npm run build` や独自スクリプトで `dist/` を上書きしない。

### Step 6: Validate

以下を実行する。

```bash
npm run validate
```

問題があれば修正する。

## Completion Report

完了時は以下を報告する。

- 作成・更新したファイル
- 主な変更内容
- 検証結果
- 未解決事項
- 公開前に確認すべき事項
