# HTML Slide Rules

## Purpose

発表用HTMLスライド `dist/index.html` を作成するためのルール。

## Source

- 編集対象は `dist/index.html`
- 内容確認の参照元は `docs/slides.md`
- `docs/slides.md` の `# Slide N:` と `dist/index.html` のスライド番号・順序を対応させる

## Slide Principle

- 1スライド1メッセージ
- 1スライドの主張は `## Message` に従う
- `## Content` の内容を画面に表示する
- `## Speaker Notes` はHTML内に発表者メモとして埋め込んでもよいが、通常表示では目立たせない
- `## Source` がある場合は、スライド下部に小さく表示する
- HTMLはテンプレートから再生成せず、`dist/index.html` と `dist/assets/` を直接更新する

## Density

- 箇条書きは最大5点
- 長文は避ける
- 1行は短くする
- 情報が多い場合はスライドを分割する
- 表は最大5行程度を目安にする

## Navigation

- キーボードで前後移動できる
- 右矢印、Space、PageDownで次へ
- 左矢印、PageUpで前へ
- Homeで最初へ
- Endで最後へ
- 現在のスライド番号を表示する

## Layout

使用可能なLayout:

- title
- section
- message
- two-column
- process
- checklist
- comparison
- kpi-cards
- risk-table
- file-tree
- message-with-code
- summary

## Accessibility

- 見出し階層を崩さない
- 画像にはaltを付ける
- 色だけで意味を伝えない
- 十分な文字サイズにする
- キーボード操作可能にする

## Prohibited

- 1スライドに複数テーマを入れる
- 本文を小さくして無理やり詰め込む
- inline styleを多用する
- `templates/` を主経路として新規生成・更新する
- 意味のないアニメーションを入れる
