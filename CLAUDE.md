# Claude Code Instructions

このリポジトリは、GitHub Pagesで公開可能なHTML資料を作成するためのプロジェクトです。

## Primary Goal

`dist/` 配下のHTML/CSS/JSを直接編集し、以下の2つのHTML資料を作成・更新してください。
`docs/` のMarkdownは内容確認・構成確認のための参照元として扱い、`dist/` を上書き生成する前提にはしません。

- `dist/index.html`: 発表用スライド
- `dist/notes.html`: 後読み用の縦スクロール資料

## Reference Priority

作業時は以下の順に参照してください。

1. `docs/brief.md`
2. `dist/index.html`
3. `dist/notes.html`
4. `dist/assets/`
5. `docs/slides.md`
6. `docs/notes.md`
7. `DESIGN.md`
8. `rules/*.md`

## Output Rules

- 成果物は必ず `dist/` 配下で直接更新する
- `dist/index.html` は発表用スライドにする
- `dist/notes.html` は縦スクロール型の後読み資料にする
- すべてのCSS、JS、画像は相対パスで参照する
- GitHub Pagesのサブパス配信でも壊れないようにする
- 外部CDN依存は原則避ける
- `DESIGN.md` にない色や装飾を勝手に増やさない
- `npm run build` やスクリプトで `dist/` を再生成して既存HTMLを上書きしない

## Content Rules

- `dist/index.html` は `docs/slides.md` のSlide単位と対応させる
- 1スライド1メッセージを原則とする
- 1スライドに長文を詰め込まない
- `dist/notes.html` は読み物として自然な構成にする
- 発表用スライドと後読み資料は、役割を分ける
- 事実・数値・外部仕様には出典を付ける
- 不確かな内容は推測せず、未確認事項として明示する

## Visual Rules

- デザイン判断は `DESIGN.md` に従う
- レイアウト、余白、色、文字サイズを一貫させる
- 情報密度が高い場合はスライドを分割する
- 経営層・実務者の両方に伝わる、過度に装飾的でないデザインにする
- 図表・カード・比較表を優先し、長文を避ける

## Validation Rules

完了前に以下を確認してください。

- `npm run build` を実行しても `dist/*.html`を破壊しない
- `npm run validate` が成功する
- `dist/index.html` が存在する
- `dist/notes.html` が存在する
- CSS/JS/画像パスが相対パスになっている
- GitHub Pages配信時に壊れるルート絶対パスを使っていない
- 社内資料として公開して問題ない内容か確認する

## Prohibited

- `/assets/...` のようなルート絶対パスを使わない
- `.env` や秘密情報を読まない
- 機密情報、認証情報、社内限定URLを成果物に含めない
- 意味のない装飾を増やさない
- 出典のない数値や断定を入れない
- 1つのスライドに複数の主張を詰め込まない

## Recommended Workflow

1. `docs/brief.md` を読み、目的・読者・制約を把握する
2. `dist/index.html` と `dist/notes.html` の現在表示を確認する
3. 必要に応じて `docs/slides.md` / `docs/notes.md` を参照し、内容の対応を確認する
4. `DESIGN.md` と `rules/` を確認する
5. `dist/` 配下のHTML/CSS/JSを直接更新する
6. `npm run validate` を実行する
7. 問題があれば修正する
8. 変更内容、未解決事項、公開前チェック結果を報告する
