# Current State

## Current Goal

- `dist/index.html` において、cssの設定値が2箇所に記載があるため、その重複を削除する
- 具体例：
  - `#s1`の設定値が119〜123行目および552〜559行目に離れた位置に記述、一部重複
- 理想系：
  - `#s1`の設定値は119行目〜の1箇所にまとめて記載され、上書きされず1箇所のみで指定されている状態にする

## Background

- 以前は `templates/` から `dist/` を生成する方針だったが、使い勝手が悪いため廃止する
- 今後は `dist/` を成果物兼編集対象としてgit管理し、GitHub Pagesへそのままデプロイする
- `docs/slides.md` は55スライド分の本文が完成している（Title / 第1部 / 第2部 / 第3部 / まとめ）
- `docs/slides.md` の各スライドは `## Message` `## Layout` `## Component` `## Visual` `## Content` `## Speaker Notes` `## Source` の固定構造を持つ
- `templates/` は旧生成方式の名残であり、通常作業では主経路にしない
- `scripts/build.mjs` は旧生成方式そのものだったため削除済み
- `dist/index.html` のコーディングは完了しているので、あとはcss設定値の重複を除外するのみ

## Files in Scope

- `dist/index.html`

## Decisions

- `dist/` はgit管理する
- `templates/` を新規作成・更新する方針は採用しない
- `npm run build` は `dist/` を再生成しない。既存HTML/CSS/JSを破壊しない存在確認コマンドとして扱う
- デザイン変更は `dist/assets/css/base.css` / `slides.css` / `notes.css` を直接編集する
- スライドやノートの内容を変えた場合は、`docs/` 側の参照Markdownと `dist/` 側の表示内容のズレを確認する

## Next Action

1. commitして完了

## Notes

- 微調整の運用ルール: ページ単位で見た目を変えたくなった場合は、まず `dist/assets/css/` の共通クラスとして整理する。同じ要望が2回以上出たら、それは個別調整ではなく共通スタイル不足のシグナルとして扱う。
- 個別スライドへのinline style埋め込みは原則禁止。必要な見た目はCSSクラスとして `dist/assets/css/` に追加する。

## Notes UI Requirements

`dist/notes.html` は後読み・配布用資料として、スライドより情報量を多く持たせる。HTMLを直接編集する際は、次のUIを維持する。
UI変換のための旧実装契約はこのファイルに集約し、`docs/notes.md`の本文には読者向けでないUI Contractを表示しない。

### Global Layout

- 画面上部に固定ヘッダーを置く
  - 左側: 資料タイトル `Claude Codeを設計して使う`
  - 右側: 章タブ
- タブは次の5つ
  - `intro`
  - `part-1`
  - `part-2`
  - `part-3`
  - `closing`
- タブクリックで対象章だけを表示する、または対象章までスクロールする
- URL hashで直接章・セクションへ移動できるようにする

### Per-tab Layout

- 各タブ内は2カラム構成
  - 左: 章内ナビゲーション
  - 右: 本文
- 左ナビには、該当タブ内の `##` / `###` 相当のセクションタイトルだけを表示する
- 左ナビのリンククリックで、右本文の該当タイトルまでスムーズスクロールする
- 左ナビはsticky表示にし、長い章でも現在位置を見失わないようにする

### Accordion

`docs/notes.md` の次の記法をアコーディオンとして変換する。

```md
:::details title="表示タイトル"
本文
:::
```

- 初期状態は閉じる
- タイトルクリックで開閉する
- 論文メモ、外部解析、claw-code由来の推定、細かいTips、コマンド詳細はアコーディオンに入れる
- アコーディオン内でもMarkdown表・リスト・コードブロックを表示できるようにする

### Quiz

`docs/notes.md` の次の記法を4択クイズUIとして変換する。

```md
:::quiz id="part-2-q1" answer="B"
question: 質問文
A. 選択肢A
B. 選択肢B
C. 選択肢C
D. 選択肢D
explanation: 解説文
:::
```

- 選択肢をクリックすると正誤判定を表示する
- 正解は緑、誤答は赤、未選択は通常表示
- 解説は選択後に表示する
- `answer` は `A` / `B` / `C` / `D` のいずれか
- 章末にハンズオンとクイズを置く

### Notes Content Policy

- `docs/notes.md` は配布用なので、スライドに載せきれなかった情報を積極的に載せる
- ただし常時表示は「章の要点」「判断基準」「実務での行動」に絞る
- 細かいTips、論文メモ、外部解析、コマンド詳細はアコーディオンに入れて、読みたい人だけ展開できるようにする
- 外部解析・公開リーク由来の内容は、現在の公式仕様ではなく「観測からの仮説」として明示する
