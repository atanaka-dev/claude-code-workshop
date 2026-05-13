---
title: Claude Codeを設計して使う
subtitle: 社内勉強会
audience: Claude Codeをそれなりに使ったことがある社内メンバー
duration: 240min
output: dist/index.html
---

<!-- markdownlint-disable MD022 MD024 MD025 MD032 MD034 MD058 -->

# Slide 1: Title

## Message
Claude Codeを「なんとなく使う」から「設計して使う」へ。

## Layout
title

## Component
title-slide

## Visual
中央寄せのタイトルスライド。背景は淡いグラデーション。装飾は控えめにし、実務的な印象にする。

## Content
- Claude Codeを設計して使う
- 2026.05.16
- AI広場

## Speaker Notes
今日はClaude Codeの便利機能を並べる会ではありません。内部の動き方を踏まえて、何をどこに置き、どこから先を仕組みに逃がすかを考える会です。

## Source
なし

---
# Slide 2: 今日のゴールと前提

## Message
Claude Codeを「会話相手」ではなく「設計対象」として扱えるようになる。

## Layout
two-column

## Component
two-column

## Visual
左に今日のゴール、右に対象者の前提を置く。中央上部に大きなメッセージを配置する。

## Content
ゴール:
- 最初に何を渡すか
- 会話中の情報をどう運用するか
- 自然言語指示の限界をどう補うか

前提:
- Claude Codeのアカウント・環境は準備済み
- `/init`や`CLAUDE.md`を見たことがある
- `/compact`や`/clear`に困った経験がある
- 便利機能より、原理と設計判断を重視する

## Speaker Notes
「プロンプトをうまく書く」だけではなく、ファイル、設定、会話履歴、拡張機能を含めた全体設計としてClaude Codeを扱う、というのが今日のテーマです。初回インストールや基本操作は扱わず、すでに使っていて「なぜこうなるのか」「どう設計すれば安定するのか」が気になっている人向けに進めます。

## Source
なし

---

# Slide 3: 全体像

## Message
今日の勉強会は、Claude Code経験者が通りがちな3つの困りごとを扱う。

## Layout
process-flow

## Component
process-flow

## Visual
横方向に3つの大きなブロックを並べる。各ブロックは「困りごと → 今日のテーマ」の対応で見せる。

## Content
- `/init`後に何を書けばいい？ → 最初に渡す情報を設計する
- 長い会話で挙動が崩れる → コンテキストを運用する
- 毎回の手作業・守らない指示がつらい → 仕組みに逃がす

## Speaker Notes
今日の勉強会は、Claude Codeの機能カタログではありません。経験者が一度は通る3つの困りごとを入口にして、それぞれを「初期情報の設計」「コンテキスト運用」「拡張機能への外部化」というテーマで整理します。

## Source
なし

---

# Slide 4: エビデンス情報の扱い

## Message
外部解析やリーク由来の内容は「現在仕様」ではなく「観測からの仮説」として扱う。

## Layout
risk-table

## Component
risk-table

## Visual
信頼度を3段階で示す表。公式情報を濃く、補助情報を薄めに表示。

## Content
| 信頼度 | 情報源 | 扱い | 代表例 |
| --- | --- | --- | --- |
| 高 | 公式ドキュメント | 仕様として参照 | [Claude Code Docs](https://code.claude.com/docs/ja/overview) |
| 中 | 公式ブログ/API docs、論文 | 背景理解 | [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot)<br>[Lost in the Middle](https://arxiv.org/abs/2307.03172)<br>[MorphのContext Rot分析](https://www.morphllm.com/context-rot) |
| 補助 | 外部分析・公開解析 | 仮説として扱う | [How Claude Code Builds a System Prompt](https://www.dbreunig.com/2026/04/04/how-claude-code-builds-a-system-prompt.html)<br>[Claude Code source leak analysis](https://www.sabrina.dev/p/claude-code-source-leak-analysis)<br>[ultraworkers/claw-code](https://github.com/ultraworkers/claw-code)<br>[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) |

## Speaker Notes
claw-codeやリーク系の情報は、講義では「なぜそう見えるか」を理解する補助にします。参加者に「これが現在の公式仕様です」と断言しないことが重要です。

## Source
なし

---

# Slide 5: 第1部：Claude Codeに渡す情報を設計する

## Message
情報の渡し方を設計するだけで、出力品質は劇的に変わる。

## Layout
section-divider

## Component
section-divider

## Visual
赤い縦線と章タイトルを大きく中央配置し、補足の1行を添える。

## Content

## Speaker Notes
ここでは「設定ファイルの紹介」ではなく、Claude Codeの初期状態にどういう情報を入れるべきかを扱います。

## Source
なし

---

# Slide 6: よくある状況

## Message
`CLAUDE.md`は「とりあえず作るファイル」ではなく、
Claude Codeの振る舞いを決める入口。

## Layout
checklist

## Component
checklist

## Visual
よくある疑問を3つ縦に並べ、最後に今日の問いへつなげる。

## Content
- `/init`で作られるけど、何を書けばいい？
- `settings.json`や`Auto memory`と何が違う？
- 長く書けば書くほど賢くなる？

## Speaker Notes
Claude Code経験者でも、`CLAUDE.md`を単なるメモの置き場として扱っていることがあります。まず、このファイルがどのようにプロンプトへ入っていくのかを見ます。

## Source
なし

---

# Slide 7: 第1部の問い

## Message
情報を、常に渡す・必要なときだけ読む・機械で止める。どう分ける？

## Layout
kpi-cards

## Component
kpi-cards

## Visual
3枚のカードで、常時渡す情報、必要時参照する情報、機械的に制御する情報を並べる。

## Content
- 常時渡す：`CLAUDE.md` / `rules`
  - 毎セッション自動で読み込まれる
  - 短く・行動に直結する指示に絞る
  - 例: `CLAUDE.md`、`rules/`

- 必要時参照：`docs/` 配下のファイル
  - 長い仕様・設計判断・作業状態
  - 必要なときだけ読ませる
  - 例: `docs/ai/current-state.md`

- 機械的に制御：`settings.json` / Hooks
  - 権限・禁止操作は機械的に止める
  - 自然言語指示では守れない領域
  - 例: `.env`拒否、`rm -rf`ブロック

## Speaker Notes
`CLAUDE.md`に全部書く、という設計は破綻しやすいです。常時入れるべきもの、ファイルとして参照させるもの、設定やHooksで機械的に止めるものを分けます。

## Source
なし

---

# Slide 8: プロンプトの組み立て

## Message
`CLAUDE.md`は「必要時に検索される資料」ではなく、初期文脈に入る指示。

## Layout
checklist

## Component
checklist

## Visual
`settings.json`、`CLAUDE.md`、`rules`がClaude Codeの実行文脈に入る流れを図にする。

## Content
- `CLAUDE.md`: 全文が初期文脈に入る
- `settings.json`: 許可・拒否・環境設定を決める
- 近い階層の設定が優先される

## Speaker Notes
解析ベースでは、`CLAUDE.md`にはファイル単位・全体単位の文字数上限があると見られます。大事なのは数字の暗記ではなく、常時読み込まれるものは短く設計すべきという判断です。

## Source
なし

---

# Slide 9: 情報の寿命

## Message
情報は「いつ読まれるか」と「いつまで残るか」で分類する。

## Layout
risk-table

## Component
risk-table

## Visual
3列の簡易表。投影では細かい備考を入れず、寿命の違いを強調する。

## Content
| 情報 | 読むタイミング | 向いている用途 |
| --- | --- | --- |
| `CLAUDE.md` | セッション開始時 | 常時守る方針 |
| `settings.json` | プロセス起動時 | 権限・環境設定 |
| `docs` | 必要時 | 長い仕様・状態 |
| 会話履歴 | 毎ターン | 作業中の文脈 |

## Speaker Notes
元メモにはより詳細な表があります。スライドでは、どの情報も同じようには扱えない、というメッセージに絞ります。

## Source
なし

---

# Slide 10: `CLAUDE.md`の設計

## Message
`CLAUDE.md`は「毎回守る判断基準」に絞り、長い情報は参照先へ逃がす。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
3枚のカードで`CLAUDE.md`、`rules/`、`docs/`を並べる。中央上部に「短く、強く、行動に直結」と表示。

## Content
- `CLAUDE.md`
  - 常時守るプロジェクト方針
  - 作業前後の基本動作
  - チームで揃えたい判断基準
  - 例: バグ修正時は回帰テストを追加
  - 短く、強く、行動に直結させる書き方をする

- `rules/`
  - API変更時の入力検証ルール
  - テスト追加・実行ルール
  - frontend / backend / db など領域別ルール
  - `paths:`で対象範囲を絞る

- `docs/`
  - ADRなどの設計判断
  - 現在の作業状態
  - 既知の地雷・引き継ぎ
  - 長い仕様・賞味期限つき情報

## Speaker Notes
「このプロジェクトでは品質を大切にしています」より、「バグ修正には回帰テストを追加する」の方が効きます。一方で、長い設計資料や動的な作業状態を`CLAUDE.md`に直接書くと、すぐ古くなります。`CLAUDE.md`は全体方針、`rules/`は条件付きで効く行動ルール、`docs/`は読ませる資料として分けると運用しやすくなります。

## Source
なし

---

# Slide 11: 自然言語指示と機械的制御

## Message
`CLAUDE.md`は「お願い」、`settings.json`は「制御」。

## Layout
risk-table

## Component
risk-table

## Visual
自然言語指示と機械的制御の違いを強調する。

## Content
| 種類 | 例 | 向いていること |
| --- | --- | --- |
| `CLAUDE.md` / `rules` | テスト方針 | 判断基準 |
| `settings.json` | `.env`拒否 | 権限・禁止 |
| Hooks | 編集後format | 必ず実行 |

## Speaker Notes
絶対に守らせたいことを自然言語だけに頼るのは危険です。第1部ではHooksを深掘りせず、「機械的制御に逃がす」という伏線に留め、第3部で回収します。

## Source
なし

---

# Slide 12: `CLAUDE.md`の設計原則

## Message
良い`CLAUDE.md`は「短い」「具体的」「腐りにくい」。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
3枚のカード。短い、具体的、腐りにくい。

## Content
- 短い：常時入れる価値がある情報だけ
  - 「念のため全部書く」は悪手
  - 増えるほど重要な指示が埋もれる
  - 目安: 100行以内

- 具体的：行動に直結する文にする
  - NG: 「品質を大切にする」
  - OK: 「バグ修正には回帰テストを追加」
  - 観測可能な行動として書く

- 腐りにくい：詳細はファイル参照へ逃がす
  - 動的な情報はdocs/に書く
  - CLAUDE.mdにはポインタを置く
  - 賞味期限のある情報は外に出す

## Speaker Notes
「念のため全部書く」は悪手になりやすいです。AIに対する指示が増えすぎると、重要な指示が埋もれたり、古い情報がノイズになったりします。

## Source
なし

---

# Slide 13: Bad / Good Rules

## Message
曖昧な価値観より、観測可能な行動を書く。

## Layout
two-column

## Component
two-column

## Visual
左にBad、右にGood。Good側を強調色にする。

## Content
Bad:
- 品質を大切にする
- テストは重要

Good:
- バグ修正には回帰テストを追加
- テスト未実行なら理由を書く

## Speaker Notes
参加者には、実際の自分のプロジェクトのルールをこの粒度に落とすイメージを持ってもらいます。

## Source
なし

---

# Slide 14: 置き場所の判断

## Message
「何を書くか」より先に「どこに置くか」を決める。

## Layout
risk-table

## Component
risk-table

## Visual
やりたいこと、置き場所、理由の3列表。

## Content
| やりたいこと | 置き場所 | 理由 |
| --- | --- | --- |
| 計画を出してほしい | `CLAUDE.md` | 行動方針 |
| `.env`を読ませたくない | `settings.json` | 権限制御 |
| formatを忘れたくない | Hook | 機械処理 |

## Speaker Notes
元メモの表にはより多くの例があります。スライドでは代表例だけに絞り、口頭で「迷ったら、判断基準か、権限制御か、自動処理かで分ける」と説明します。

## Source
なし

---

# Slide 15: 章末問題：どこに置く？

## Message
やりたいことごとに、置き場所を選んでみる。

## Layout
risk-table

## Component
risk-table

## Visual
選択肢を上部に小さく置き、やりたいことと回答欄を表で表示する。

## Content
選択肢: `CLAUDE.md` / `rules` / `settings.json` / Hook

| Q | やりたいこと | 置き場所 |
| --- | --- | --- |
| 1 | 実装前に計画を出してほしい | ? |
| 2 | APIファイル変更時は入力検証してほしい | ? |
| 3 | `.env`を絶対に読ませたくない | ? |
| 4 | `rm -rf`をブロックしたい | ? |
| 5 | 編集後にprettierを走らせたい | ? |

## Speaker Notes
ここでは正解を急がず、まず「自然言語の判断基準なのか」「領域別ルールなのか」「権限制御なのか」「実行タイミングに応じた機械処理なのか」を考えてもらいます。

## Source
なし

---

# Slide 16: 答え合わせ：どこに置く？

## Message
置き場所は「判断基準」「領域別ルール」「権限制御」「自動実行」で分ける。

## Layout
risk-table

## Component
risk-table

## Visual
前スライドと同じ表レイアウトで、回答と理由を追加する。正解列を強調する。

## Content
| Q | やりたいこと | 置き場所 | 理由 |
| --- | --- | --- | --- |
| 1 | 実装前に計画を出してほしい | `CLAUDE.md` / `rules/workflow.md` | 行動方針だから |
| 2 | APIファイル変更時は入力検証してほしい | `rules/api.md` | 領域別ルールだから |
| 3 | `.env`を絶対に読ませたくない | `settings.json` | 自然言語指示では弱い |
| 4 | `rm -rf`をブロックしたい | `settings.json` / `PreToolUse` Hook | 実行直前に止める必要がある |
| 5 | 編集後にprettierを走らせたい | `PostToolUse` Hook | 編集後の機械処理だから |

## Speaker Notes
ポイントは、`CLAUDE.md`に全部書かないことです。判断基準は`CLAUDE.md`や`rules`、禁止や権限は`settings.json`、タイミングに応じて必ず動かしたい処理はHooksに逃がします。

## Source
なし

---

# Slide 17: Hands-on 1: CLAUDE.mdを設計する

## Message
Claude Codeが毎回迷わず作業できるように、初期文脈・参照資料・機械的制御を分ける。

## Layout
hands-on

## Component
hands-on (Goal / Task / Output)

## Visual
Goalの帯を上に置き、Task(5項目)とOutput(3項目)を2カラムカードで並べる。

## Content
Goal:
- Claude Codeが毎回迷わず作業できるように、初期文脈・参照資料・機械的制御を分ける。

Task:
1. [このリポジトリ](https://github.com/atanaka-dev/claude-code-workshop)の構成を確認する
2. `CLAUDE.md` に置くべきルールを3つ選ぶ
3. `rules/` に分けるべき領域別ルールを2つ作る
4. `docs/ai/current-state.md` に逃がす情報を決める
5. `settings.json` または Hook候補にすべき制御を1つ挙げる

Output:
- `CLAUDE.md` 改善案
- `rules/*.md` 改善案
- `docs/ai/current-state.md` 初版

## Speaker Notes
ここでは完成度よりも分類が目的です。`CLAUDE.md`に置く、`rules/`に分ける、`docs/ai/`に逃がす、`settings.json`やHooksに逃がす、の判断を体験してもらいます。リポジトリの構成を出発点に、自分のプロジェクトに置き換える視点を持って帰ってもらいます。

## Source
なし

---

# Slide 18: 第2部：会話が長くなるとなぜ壊れるか

## Message
会話が長くなるほど、情報は増え、削られ、劣化する。

## Layout
section-divider

## Component
section-divider

## Visual
赤い縦線と章タイトルを大きく中央配置し、補足の1行を添える。

## Content

## Speaker Notes
第1部では最初に入れる情報を見ました。第2部では、会話が進む中で情報がどう増え、削られ、劣化するかを見ます。

## Source
なし

---

# Slide 19: よくある状況

## Message
長い会話は、続けるほど「賢くなる」とは限らない。

## Layout
message

## Component
message-slide

## Visual
会話が伸びるほどノイズが増えるイメージの図。

## Content
- 途中で言うことを聞かなくなる
- すぐ上限オーバーが来る
- 「さっき見たwarning」という言い方が通じない
- 似た情報に引っ張られる

## Speaker Notes
経験者が感じる「最初は良かったのに、途中から変になる」という現象を扱います。

## Source
なし

---

# Slide 20: 第2部の問い

## Message
コンテキスト問題は、容量・品質・運用に分けて対策する。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
3枚のカードで、容量、品質、運用を並べる。

## Content
- 容量：コンテキストウィンドウの上限
  - 入れすぎると打ち切り・ノイズが発生
  - CLAUDE.md・MEMORY.mdにも読み込み上限あり
  - 対策: 短く設計し、必要時参照に分ける

- 品質：収まっても性能は落ちる
  - 要約漏れ・古い前提・類似ノイズの3種
  - 指示遵守・推論品質が長さとともに低下
  - 対策: `/compact`で整理、重要情報を再注入

- 運用：長い会話をどう整理するか
  - `/compact`: 必要情報を残して圧縮
  - `/clear`: 失敗履歴を断ち切る
  - Subagent: 調査を隔離してメインを汚さない

## Speaker Notes
コンテキスト窓に収まっているかどうかだけでは不十分です。収まっていても、情報が多すぎると指示遵守や推論品質が落ちます。

## Source
なし

---

# Slide 21: 初回から重い

## Message
最初に入れすぎると、会話が始まる前から不利になる。

## Layout
risk-table

## Component
risk-table

## Visual
対象、推定上限、リスクを表で表示。上限値は「外部解析ベースの推定」として小さく注記する。

## Content
| 対象 | 推定上限 | リスク | 備考 |
| --- | --- | --- | --- |
| `CLAUDE.md` | 1ファイル4,000文字 / 合計12,000文字 | 打ち切り・ノイズ化 | 外部解析ベース |
| `MEMORY.md` | 先頭200行 / 25KB | 古い学習メモが混ざる | 公式 |
| ツール定義 | コア8ツールはinline | 判断負荷が増える | 公式 |

`CLAUDE.md`上限は外部解析ベース、`MEMORY.md`とツール定義は公式情報として扱う

## Speaker Notes
`CLAUDE.md`の文字数上限は`claw-code`などの外部解析からの推定として扱います。一方で、`MEMORY.md`の読み込み上限やツール定義の遅延ロードは公式情報として扱います。重要なのは、`CLAUDE.md`や`MEMORY.md`には無限に入れられるわけではなく、初回から重くしすぎると会話開始前から不利になるという点です。

## Source
なし

---

# Slide 22: Deferred Tools

## Message
ツール定義も、必要になるまで遅延ロードする方向に進んでいる。

## Layout
process-flow

## Component
process-flow

## Visual
「コアツールはinline」「残りはToolSearchで取得」の2段階図。

## Content
- コアツールだけ最初から入れる
- それ以外は名前だけ見せる
- 必要になったらschemaを取りに行く

設計思想: 何でも最初から入れない

## Speaker Notes
これは内部実装の細かい話ですが、思想として重要です。すべてを最初から入れず、必要な時だけ読み込む。`CLAUDE.md`やSkills設計にも同じ発想を使えます。

## Source
なし

---

# Slide 23: 会話履歴は増幅する

## Message
会話を続けるほど、ユーザー発言・応答・ツール結果が積み上がる。

## Layout
process-flow

## Component
process-flow

## Visual
ユーザー発言、アシスタント発言、tool resultが積み重なる縦方向の図。

## Content
- ファイル読み取り結果
- コマンド出力
- 試したが失敗した修正
- 古い前提や寄り道

## Speaker Notes
会話履歴には成功した知見だけではなく、失敗したアプローチや古い前提も残ります。これが後半の誤動作の原因になります。

## Source
なし

---

# Slide 24: Microcompact

## Message
Microcompactでは、古いtool resultだけがピンポイントで削られる。

## Layout
risk-table

## Component
risk-table

## Visual
tool resultだけが薄く消える図と、残るもの・消えるものの表を並べる。

## Content
| 対象 | 扱い |
| --- | --- |
| 直近5件のtool result | 保持 |
| それ以前のtool result | 削除 |
| ユーザー発言 | 残る |
| アシスタント発言 | 残る |

必要な調査結果は`docs/ai/current-state.md`へ退避する

## Speaker Notes
Microcompactは、会話全体を要約するというより、古いファイル読み取り結果やコマンド出力などのtool resultを削る軽量圧縮です。ユーザー発言とアシスタント発言は残る傾向があります。ただし、消されたtool resultに重要な情報が含まれていると後で困るため、内部指示にも「後で必要になりそうな情報は応答に書き写せ」という趣旨があります。重要な調査結果は`docs/ai/current-state.md`などに逃がすと安定します。

## Source
なし

---

# Slide 25: Auto-compact

## Message
Auto-compactでは、古い会話履歴が別モデルで要約される。

## Layout
risk-table

## Component
risk-table

## Visual
左に「圧縮前」、右に「圧縮後」の流れを置き、下に対象と扱いの表を表示する。

## Content
| 観点 | 内容 |
| --- | --- |
| 発火目安 | コンテキストウィンドウの約90%(？) |
| 動作 | 古い履歴を別のClaudeモデルで要約 |
| 圧縮対象 | tool result / 過去のアシスタント発言が中心 |
| 残りやすいもの | ユーザー発言 |
| 注意 | 重要情報がsummaryから落ちることがある |

対策: compact前に「残す情報」を明示する

## Speaker Notes
Auto-compact自体は必要な仕組みです。リーク分析では、コンテキストウィンドウの約90%に達した時点で古い会話履歴を別のClaudeモデルに渡して要約させるとされています。圧縮プロンプトには、ユーザーに追加質問せず継続する趣旨の指示も含まれます。ただ、ユーザーが「これを残して」と明示していない情報はsummaryから落ちる可能性があります。後で使う情報は自分から退避します。

## Source
なし

---

# Slide 26: `CLAUDE.md`の再注入

## Message
圧縮後も`CLAUDE.md`は再注入されるが、作業中の細かい文脈は`docs/ai/*`で補う。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
動的な文脈を5つのファイル/ルールで補完する一覧。

## Content
- `CLAUDE.md`：圧縮後も自動で再注入される
- `docs/ai/current-state.md`：今の作業状態
- `docs/ai/handoff.md`：セッション引き継ぎ
- `docs/ai/known-issues.md`：何度も踏む地雷
- `Auto-expire`：古い情報の賞味期限

## Speaker Notes
「圧縮後も`CLAUDE.md`が戻る」ことと、「作業中の全部の文脈が戻る」ことは違います。後者は人間側で設計する必要があります。動的な情報を`CLAUDE.md`へ直接書くとすぐ古くなるので、`CLAUDE.md`には「現在の作業状態は`docs/ai/current-state.md`を見る」のようなポインタを置き、実体は`docs/ai/*`へ逃がします。`known-issues`にはClaudeが何度も踏む地雷を書き、`Auto-expire`で賞味期限を明記して定期的に掃除します。

## Source
なし

---

# Slide 27: bad autocompaction

## Message
「さっきのあれ」は、圧縮後には存在しないかもしれない。

## Layout
message

## Component
message-slide

## Visual
中央に「さっき見たwarningを直して」を大きく表示し、その下に起きる問題を3点で並べる。

## Content
「さっき見た別のwarningを直して」

- summaryから落ちている可能性
- 指示対象が曖昧になる
- 別の問題に引っ張られる

## Speaker Notes
長いdebugging sessionでは複数のwarningやエラーを見ます。圧縮後に「さっきの」と言っても、モデル側には残っていないことがあります。

## Source
なし

---

# Slide 28: Context Rot

## Message
コンテキスト窓に収まっていても、長くなるほど性能は落ちる。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
3つのカードで原因を表示し、各カードに短い説明を添える。Lost / Dilution / Distractorを見出しにする。

## Content
- Lost in the Middle: 中盤の指示が見落とされる
- Attention Dilution: 入力が長いほど注意が薄まる
- Distractor Interference: 似たノイズに引っ張られる

## Speaker Notes
Lost in the Middleは、先頭と末尾に注意が集まり、中盤の関連情報が見落とされやすくなる現象です。Attention Dilutionは、入力が長くなるほどattentionが多くのトークンに分散し、重要な指示への集中が薄まる問題です。Distractor Interferenceは、意味的には似ているが正解ではない情報に引っ張られる問題です。コーディングでは、似た関数名、過去の似たエラー、別テストのassertionなどがノイズになります。

## Source
なし

---

# Slide 29: コーディングで起きるContext Rot

## Message
関連しそうで関連しない情報は、無いより悪いことがある。

## Layout
message

## Component
message-slide

## Visual
似た関数名や似たエラーが混線するイメージ。

## Content
- 古い関数名を使ってしまう
- 別エラーの修正を当ててしまう
- 別テストのassertionを混ぜてしまう

## Speaker Notes
コーディングエージェントでは、類似ノイズの影響がかなり実感しやすいです。調査しすぎた結果、むしろ間違うことがあります。

## Source
なし

---

# Slide 30: コンテキスト運用の基本

## Message
長い会話は「続ける」のではなく「節目で整理する」。

## Layout
checklist

## Component
checklist

## Visual
チェックリスト形式。各項目を短く表示。

## Content
- 小タスクごとに`/compact`
- 重要情報は明示的に再注入
- 失敗ループでは`/clear`
- 調査結果は`docs`やSubagentへ逃がす

## Speaker Notes
人間の作業でも、調査、実装、レビューを全部同じメモに雑に積むと混乱します。Claude Codeでも節目を作ります。

## Source
なし

---

# Slide 31: `/compact`と`/clear`

## Message
`/compact`は残すため、`/clear`は断ち切るために使う。

## Layout
risk-table

## Component
risk-table

## Visual
2列比較。compactとclearを対比。

## Content
| コマンド | 使う場面 | 目的 |
| --- | --- | --- |
| `/compact` | 小タスク完了、会話が長い | 必要情報を残す |
| `/clear` | 別タスクへ移る、2回失敗 | 失敗履歴を断ち切る |

例: `/compact APIの変更点、触ったファイル、未解決のテスト失敗、次にやることを残して`

## Speaker Notes
`/compact`では「何を残してほしいか」を指定します。例えば`/compact APIの変更点、触ったファイル、未解決のテスト失敗、次にやるべきことを残して`のように、後続作業に必要な観点を明示します。`/clear`は失敗した会話履歴を断ち切るために使います。`CLAUDE.md`や`MEMORY.md`は再注入されますが、会話履歴は失われます。

## Source
なし

---

# Slide 32: 分岐と再開

## Message
会話は「続ける」「戻る」「分ける」を使い分ける。

## Layout
risk-table

## Component
risk-table

## Visual
コマンドと用途の簡易表。

## Content
| 操作 | 用途 |
| --- | --- |
| `--continue` | 昨日の続き |
| `--resume` | 特定セッションに戻る |
| `/branch` / `/fork` | 別案を安全に試す |
| `/rewind` | 会話と変更を巻き戻す |

## Speaker Notes
一つの長い会話に全部入れる必要はありません。成功状態を残して別案を試す、特定の過去作業に戻る、失敗した実験を巻き戻す、といった運用ができます。

## Source
なし

---

# Slide 33: 便利コマンドの使いどころ

## Message
会話を汚さず、戻れる状態を作るための補助コマンドも使い分ける。

## Layout
risk-table

## Component
risk-table

## Visual
コマンド、役割、使いどころの3列表。会話を汚さない、戻る、レビューする、の用途を色分けする。

## Content
| コマンド | 役割 | 使いどころ |
| --- | --- | --- |
| `/btw` | 履歴に残さない寄り道質問 | 実装と関係ない確認 |
| `/recap` | 前回までを要約 | 翌朝の作業再開 |
| `/branch` / `/fork` | 会話を分岐 | 別案・実験を試す |
| `/rewind` | 会話と変更を巻き戻す | 失敗した実験を戻す |
| `/ultrareview` | 厳しめレビュー | commit前の最終確認 |

目的: 長い1本の会話に全部を詰め込まない

## Speaker Notes
`/btw`は、今の実装タスクとは関係ない質問をメイン履歴に残さず確認したいときに使います。`/recap`は作業再開時の要約、`/branch`や`/fork`は成功状態を残したまま別案を試すための分岐、`/rewind`は会話とコード変更の巻き戻し、`/ultrareview`はcommit前のエッジケース確認に使います。ここでもポイントは、長い1本の会話に全部を詰め込まないことです。

## Source
なし

---

# Slide 34: モデルと思考レベル

## Message
軽作業は軽く、判断が重い作業は深く考えさせる。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
軽作業、重い判断タスク、`/model`・`/effort`の3枚カードで表示する。

## Content
- 軽作業：リネーム、文言修正、単純生成
- 重い作業：設計判断、複数ファイル変更、セキュリティ
- 切り替え：`/model`と`/effort`をタスク別に使い分ける

## Speaker Notes
「常に最強設定」が正解ではありません。トークンコストと速度、品質のバランスをタスクごとに変える視点を入れます。

## Source
なし

---

# Slide 35: 第2部ワーク

## Message
会話を切るタイミングを、コマンド選択として判断する。

## Layout
checklist

## Component
checklist

## Visual
ケースを5つ並べ、参加者に選ばせる形式。

## Content
- 小タスクが終わった
- 同じ修正に2回失敗した
- 昨日の作業を再開したい
- 成功状態から別案を試したい
- 完全に別タスクへ移る

## Speaker Notes
参加者に`/compact`、`/clear`、`--continue`、`--resume`、`/branch`などを選んでもらいます。答え合わせでは「なぜそのコマンドなのか」を重視します。

## Source
なし

---

# Slide 36: Hands-on 2: コンテキスト運用テンプレートを作る

## Message
長い会話を続けて壊すのではなく、節目で整理・退避・リセットできるようにする。

## Layout
hands-on

## Component
hands-on (Goal / Task / Output)

## Visual
Goalの帯を上に置き、Task(5項目)とOutput(4項目)を2カラムカードで並べる。

## Content
Goal:
- 長い会話を続けて壊すのではなく、節目で整理・退避・リセットできるようにする。

Task:
1. Claude Codeで崩れた会話を1つ思い出す
2. 原因を分類する
3. `/compact` テンプレートを作る
4. `/clear` すべき条件を決める
5. `docs/ai/handoff.md` の雛形を作る

Output:
- `compact-template.md`
- `docs/ai/current-state.md`
- `docs/ai/handoff.md`
- `clear-policy.md`

## Speaker Notes
ここでは、会話が崩れた経験を「容量・品質・運用」の枠で分類し、`/compact`の文面、`/clear`の条件、`docs/ai/handoff.md` の雛形を1つずつ作ります。実装は完璧でなくてよく、節目で整理・退避・リセットできる手段を揃えることを目指します。

## Source
なし

---

# Slide 37: 第3部：自然言語指示の限界をどう超えるか

## Message
自然言語だけで守れないものは、仕組みに逃がす。

## Layout
section-divider

## Component
section-divider

## Visual
赤い縦線と章タイトルを大きく中央配置し、補足の1行を添える。

## Content

## Speaker Notes
第1部と第2部で、自然言語指示や会話履歴には限界があることを見ました。第3部では、その限界を外部の仕組みに逃がします。

## Source
なし

---

# Slide 38: よくある状況

## Message
毎回の手作業やコピペは、拡張機能へ逃がす候補。

## Layout
checklist

## Component
checklist

## Visual
困りごとをカード状に並べる。

## Content
- コミットメッセージを毎回手で書く
- `.env`を読まれそうで怖い
- formatterを走らせ忘れる
- 外部ツールの情報をコピペする
- 大量ログで会話が汚れる

## Speaker Notes
これらは単に「プロンプトを改善する」だけでは限界があります。繰り返す作業、外部情報、必ず実行したい処理、調査の隔離を分けて考えます。

## Source
なし

---

# Slide 39: 5つの限界

## Message
自然言語指示の限界は、5種類に分解できる。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
5つの小カードを2段で配置。

## Content
- 再現性：同じ指示でも結果がバラつく
  - 完全な決定論的実行は保証できない
  - 対策: Skills で手順を再利用可能にする

- 外部接続：DBやSaaSへ自律的にアクセスできない
  - ブラウザやAPIを自力では叩けない
  - 対策: MCP で外部接続を渡す

- 決定性：「必ず守る」という保証はできない
  - 自然言語指示は確率的にしか効かない
  - 対策: settings.json / Hooks で機械的制御

- 単一スレッド：複数会話を横断できない
  - 並行タスクや情報共有が難しい
  - 対策: Subagents で並列・隔離

- 組織最適：個人の知見が組織知に変換されない
  - 個人の工夫がチームに伝わらない
  - 対策: Plugins でチーム配布

## Speaker Notes
第3部は機能名から入ると散らかります。まず、どの限界を超えたいのかを決めると、使う機能が自然に決まります。

## Source
なし

---

# Slide 40: 拡張機能の地図

## Message
拡張機能は「限界に対する逃がし先」として理解する。

## Layout
risk-table

## Component
risk-table

## Visual
限界、機能、本質の3列表。

## Content
| 限界 | 機能 | 本質 |
| --- | --- | --- |
| 再現性 | Skills | 作業の再利用 |
| 外部接続 | MCP | 情報・機能の外部化 |
| 決定性 | Hooks | 必ず実行 |
| 単一スレッド | Subagents | 分業・隔離 |
| 組織共有 | Plugins | チーム配布 |

## Speaker Notes
ここが第3部の中心です。細かい設定方法より、「何のための機能か」を先に持ち帰ってもらいます。

## Source
なし

---

# Slide 41: Skills

## Message
Skillsは、毎回貼っている手順を再利用可能な部品にする仕組み。

## Layout
message

## Component
message-slide

## Visual
繰り返し貼っていたプロンプトが`SKILL.md`にまとまる図。

## Content
- 同じプロンプトを何度も貼る
- 作業手順を標準化したい
- `CLAUDE.md`が肥大化している

## Speaker Notes
`CLAUDE.md`は常時守る短いルール、Skillsは必要時に呼び出す厚めの手順書です。第3部のハンズオン主役にしやすい機能です。

## Source
なし

---

# Slide 42: Skillの品質はdescriptionと運用で決まる

## Message
`description`は「いつ使うか」まで書き、危険な実行は明示的に絞る。

## Layout
two-column

## Component
two-column

## Visual
Bad / Goodの比較。Good側にキーワードと利用場面を表示。

## Content
Bad:
- レポート作成

Good:
- 週次KPIレポートを生成
- 月曜朝の定例前に使う
- 「週次」「KPI」で呼び出す

運用Tips:
- サンプル出力を入れる
- `disable-model-invocation: true`
- `disableSkillShellExecution`
- 1作業1Skillから始める

## Speaker Notes
Claudeはdescriptionを手がかりに自動利用を判断します。自動起動させたいSkillほど、用途・タイミング・キーワードを具体化します。一方、勝手に呼ばれると困る手順系Skillは`disable-model-invocation: true`で明示呼び出し専用にできます。出力品質を安定させたい場合はサンプル出力を入れます。危険なコマンド実行を含むSkillは、`disableSkillShellExecution`などでshell実行を無効化する選択肢もあります。巨大な万能Skillにせず、1作業1Skillから始めるのが扱いやすいです。

## Source
なし

---

# Slide 43: MCP

## Message
MCPは、外部ツールやデータソースへの接続をClaude Codeに渡す仕組み。

## Layout
radial-topology

## Component
radial-topology + notes-table

## Visual
中央にClaude Code(黒カード)、その左右にMCPサーバーカード(GitHub / DB / Logs / SaaS)を上下2段で配置し、Hubと各カードを点線で接続する放射状の図。Hubの左右に「MCP」のピル状ラベル。

## Content
中央: `Claude Code` (main agent)

周辺カード(各MCPサーバーで具体的にできること):

| MCP | できることの例 |
| --- | --- |
| GitHub | 関連Issue/PRの本文・コメントを取得 / CI失敗ログ・レビュー指摘を参照 / PRにレビューコメントを書き込む |
| DB | テーブル・カラム・インデックス情報を取得 / SELECTで本番データの現状値を確認 / read-only接続を推奨 |
| Logs | Sentry / Datadogのエラーを取得 / 該当時間帯のスタックトレースを参照 / 発生数・影響範囲を集計 |
| SaaS / 社内ツール | Slackに障害・進捗を通知 / Notion / Confluenceの仕様書を参照 / Jiraチケットの起票・ステータス更新 |

下部の用途・注意テーブル:

| 用途 | 注意 |
| --- | --- |
| GitHub / DB / ログ / 社内ツール接続 | 読み取り専用から始める |
| 外部情報の取得 | Prompt Injectionを警戒 |
| チーム共通接続 | `.mcp.json`をレビュー対象にする |

## Speaker Notes
毎回ブラウザや外部ツールから情報をコピペしているならMCP候補です。GitHubならIssue/PR本文の取得やCI結果の参照、DBならテーブル定義やSELECTでの現状確認、LogsならSentry/Datadogの障害情報、SaaSならSlack通知やNotion参照といった具体例があります。ただし権限が強いので、まずは読み取り専用から始めるのが安全です。

## Source
なし

---

# Slide 44: MCPの注意点

## Message
外部接続は便利だが、権限とPrompt Injectionのリスクを持ち込む。

## Layout
risk-list-3col

## Component
risk-list-3col

## Visual
5件のリスクを縦に並べ、各行を「Risk(番号+見出し) / 起こりうるインシデント / 解決策(Mitigation)」の3カラム構成で列挙する。番号(01〜05)は右揃えで縦ラインを揃える。

## Content
| Risk | 起こりうるインシデント | 解決策 |
| --- | --- | --- |
| 01. 書き込み権限が強い | 未検証のSQLが本番DBに走り、レコードを破壊。エージェントが `git push --force` でmainを上書きする。 | read-only接続から始める。書き込み系ツールは`allowedTools`で個別許可し、確認プロンプトを必須にする。 |
| 02. ツールが多すぎる | 関係ない決済APIまで露出していて、誤って課金APIをcall。schemaが肥大化しモデルが誤ったツール選択をする。 | 必要なtoolだけ公開しschemaを絞る。タスク単位で`allowedTools`を限定する。 |
| 03. 未信頼テキスト | Issue本文に仕込まれた指示でリポジトリ内の`.env`を外部URLに送信。ログ中のpromptで権限昇格を試みる。 | 外部由来のテキストは「データ」として扱い、機密領域へのアクセスは別ツール側で人手承認に切る。 |
| 04. 認証情報が固定化 | 長寿命のAPIトークンを`.mcp.json`に直書きし、漏洩後も気付かず数ヶ月利用され続ける。 | `headersHelper`等で短命トークンを動的に取得。シークレットはsecret managerで集中管理する。 |
| 05. チーム共有設定 | 第三者MCPを含む`.mcp.json`のPRがそのままmerge。全員の環境で勝手に外部接続が有効になる。 | `.mcp.json`をコードレビュー対象に組み込み、Project/User scopeを分けて影響範囲を限定する。 |

## Speaker Notes
MCPは便利ですが、外部から来たテキストをモデルが読むことになります。Issue本文、ログ、DBの値などがプロンプトインジェクションの入口になり得ます。各リスクに対して具体的に起こりうるインシデントを想像しておくと、対策の優先順位がつきやすくなります。運用ではProject scopeとUser scopeを分けます。Project scopeの`.mcp.json`はチーム全員に効くためレビュー対象にし、最初は読み取り専用から始めます。認証ヘッダは固定値で置かず、`headersHelper`のような仕組みで都度取得する方が安全です。

## Source
なし

---

# Slide 45: Hooks

## Message
Hooksは「忘れずにやって」ではなく「必ず実行する」ための仕組み。

## Layout
message

## Component
message-slide

## Visual
Claudeの判断を介さず、イベントで処理が走る図。

## Content
- `PreToolUse`: 危険操作を止める
- `PostToolUse`: 編集後にformat
- `Stop`: 終了前に品質チェック

自然言語で守らない指示を、イベントで強制する

## Speaker Notes
第1部で出した「自然言語指示では弱いもの」の回収です。決定論的に走らせたい処理は、SkillではなくHookに寄せます。

## Source
なし

---

# Slide 46: Hooksにするもの / しないもの

## Message
Hooksは「機械的に判定できる重要処理」に限定する。

## Layout
two-column

## Component
two-column

## Visual
左にHooksにする、右にしない。左右で色を分ける。

## Content
する:
- 秘密情報アクセス
- 破壊的操作
- formatter / lint
- 通知

しない:
- 設計判断
- 曖昧なレビュー
- 毎回重いテスト
- 長いstdout出力

最初は通知・formatterのような小さいHookから始める

## Speaker Notes
なんでもHooks化するとワークフローが壊れます。判断が曖昧なもの、人間が文脈で決めるもの、毎回重すぎるものは慎重に扱います。最初は通知やformatterのように安全で効果が見えやすいものから始めます。hookのshell scriptは小さく、単体でテスト可能にします。stdoutを使いすぎるとClaudeの文脈にノイズを戻すことがあるため、必要最小限にします。判断が曖昧な場合はprompt/agent hookも選択肢ですが、遅延とコストが増える点に注意します。

## Source
なし

---

# Slide 47: Subagents

## Message
Subagentsは、メイン会話を汚さずに調査・レビューを任せる仕組み。

## Layout
risk-table

## Component
risk-table

## Visual
Main Agentから複数のSubagentへ依頼し、要約だけ戻る図。

## Content
| 任せること | 設計Tips |
| --- | --- |
| 大量ファイル探索 / ログ調査 | メイン会話へは要約だけ戻す |
| security / performanceレビュー | 読み取り専用から始める |
| 専門調査員 | tools allowlistで権限を絞る |
| 並列調査 | 返す形式を指定する |

調査と実装は分け、メイン会話へは要約だけ戻す

## Speaker Notes
Subagentsは「複雑な仕事を分担する」より前に、「メイン会話のコンテキストを汚さない」ために使うのが実務上の肝です。まず読み取り専用の調査員として作り、tools allowlistで権限を絞ります。依頼時には「最終的に返してほしい形式」を指定します。調査と実装は分け、メイン会話へは要約と判断材料だけ戻すと安定します。並列化しすぎると管理が難しくなるため、同時に注意を向けるのは少数に抑えます。

## Source
なし

---

# Slide 48: Plugins

## Message
Pluginsは、個人の工夫をチームの標準ワークフローにする仕組み。

## Layout
risk-table

## Component
risk-table

## Visual
Skills、Hooks、Agents、MCPがPluginとして束ねられ、チームに配布される図。

## Content
- Skills / Hooks / Agents / MCPを束ねる
- 複数プロジェクトへ配布
- version管理・security reviewが必要
- まずstandaloneで検証
- update運用を決める

Plugin化は「チーム標準」にしてよいものだけ

| 段階 | 判断 |
| --- | --- |
| standalone `.claude/` | 個人・少人数で検証 |
| Plugin化 | チーム標準にしてよいものだけ |
| 配布後 | version管理、security review、update運用 |

## Speaker Notes
まずはstandaloneな`.claude/`で検証し、安定してからPlugin化します。HooksやMCPを含む場合は特にレビューが必要です。Plugin化すると個人の工夫がチーム標準になるため、namespace、version固定、更新時の通知やロールバック方針まで決めておくと運用しやすくなります。

## Source
なし

---

# Slide 49: ワークフロー例：PR作成

## Message
実務では、複数の拡張機能を組み合わせてワークフローを作る。

## Layout
risk-table

## Component
risk-table

## Visual
構成と役割の表。

## Content
| 構成 | 役割 |
| --- | --- |
| Skill | PR前チェックリスト |
| MCP GitHub | Issue / PR / CI確認 |
| Hook | format / test / lint |
| Subagent | 差分レビュー |

## Speaker Notes
1つの機能で全部やるのではなく、再利用、外部接続、必ず実行、隔離調査を役割分担します。

## Source
なし

---

# Slide 50: ワークフロー例：障害調査

## Message
大量情報を扱う作業ほど、外部接続とコンテキスト隔離が効く。

## Layout
risk-table

## Component
risk-table

## Visual
障害調査の構成表。ログ・GitHub・Subagent・Skillを並べる。

## Content
| 構成 | 役割 |
| --- | --- |
| MCP Sentry/Datadog | エラー取得 |
| MCP GitHub | 関連コード確認 |
| Subagent | 大量ログ調査 |
| Skill | 分析テンプレート |

## Speaker Notes
障害調査はメイン会話にログを大量投入しがちです。Subagentに調査させて要約だけ返すと、Context Rotを抑えやすくなります。

## Source
なし

---

# Slide 51: 自動化の設計原則

## Message
全部AIに任せるのではなく、壊れにくい小さな自動化から始める。

## Layout
kpi-cards

## Component
kpi-cards

## Visual
4つの設計原則を均等な3列+1のカードで提示する。

## Content
- 分離：判断と作業を切り分ける
- 入口：壊れにくい仕組みから選ぶ
- 通知：通知先を集約する
- 起点：5分で作れるものから始める

## Speaker Notes
自動化の目的は、人間の判断をなくすことではありません。反復作業を減らし、危険な判断や承認は人間に残す設計が現実的です。たとえば人間が持つ判断は「承認・本番反映・削除・権限変更」、AIに任せる作業は「下書き・要約・分類・通知」のように分けます。認証が複雑なAPIより、読み取り専用の安定した入口を優先します。通知が増えすぎると逆に見なくなるので、重要度で通知先を分けます。最初から大きな自動化を作らず、5分で作れるformatter、通知、チェックリストから始めると失敗しにくいです。

## Source
なし

---

# Slide 52: 第3部ワーク

## Message
困りごとを、適切な逃がし先に分類する。

## Layout
checklist

## Component
checklist

## Visual
分類ワークの対象を並べる。下に候補として`CLAUDE.md` / Skill / Hook / MCP / Subagent / Pluginを表示。

## Content
- `.env`を読ませたくない
- PR前にtest/lintを走らせたい
- コミットメッセージを定型化したい
- GitHub Issueを読ませたい
- 大量ログを調査させたい
- チームに配布したい

## Speaker Notes
答えは1つに限らないものもあります。重要なのは、自然言語指示で足りるか、機械的制御が必要か、外部接続か、隔離か、共有かを判断することです。

## Source
なし

---

# Slide 53: Hands-on 3: Skillを実務用に改善する

## Message
毎回貼っている手順を、再利用可能なSkillとして整える。

## Layout
hands-on

## Component
hands-on (Goal / Task / Output + snippet)

## Visual
Goalの帯を上に置き、Taskカラムは「ol(5項目)」と「未完成SKILL.mdの<pre>」を横並びにする。OutputはTaskの右に1カラム。

## Content
Goal:
- 毎回貼っている手順を、再利用可能なSkillとして整える。

Task:
1. 未完成Skillを読む(右の `SKILL.md`)
2. `description` を改善する
3. 出力フォーマットを固定する
4. 禁止事項を書く
5. Slash command化するならどの粒度にするか決める

未完成 SKILL.md:

```
---
name: pr-summary
description: PR説明を書く
---

# PR Summary Skill

PRの説明文を作ってください。
```

Output:
- 改善済み `SKILL.md`
- Slash command案
- MCPと組み合わせる場合の設計メモ

## Speaker Notes
`description`は「いつ使うか」まで踏み込んで書き、出力フォーマットを固定し、禁止事項(機密情報を載せない、勝手にPRをopenしない、など)を明記します。Slash command化の粒度や、MCPで外部接続を足す場合の責務分担まで話せると、第3部の総合演習になります。

## Source
なし

---

# Slide 54: 3章のつながり

## Message
Claude Codeの設計は、情報を「入れる」「整理する」「外に出す」の3段階。

## Layout
process-flow

## Component
process-flow

## Visual
3ステップの大きな流れ。Input Design -> Context Operation -> Externalization。

## Content
- 最初に渡す情報を設計する
- 会話中の情報を運用する
- 限界を拡張機能へ逃がす

## Speaker Notes
第1章、第2章、第3章は別々の話ではありません。`CLAUDE.md`を短くする、コンテキストを整理する、SkillsやHooksへ逃がす、という一連の設計です。

## Source
なし

---

# Slide 55: 今日のまとめ

## Message
上手く使う人は、プロンプトだけでなく「置き場所」と「寿命」を設計している。

## Layout
checklist

## Component
checklist

## Visual
今日の持ち帰りを3点に絞る。

## Content
- `CLAUDE.md`は短く、強く、行動に直結
- 長い会話は節目で`/compact`や`/clear`
- 必ず守らせたい処理はHooksや設定へ逃がす

## Speaker Notes
今日の内容を全部覚える必要はありません。困ったときに「これは初期文脈の問題か、会話運用の問題か、外部化すべき問題か」と分類できれば十分です。

## Source
なし

---

# Slide 56: Closing

## Message
良い使い方が見つかったらチームの知識に

## Layout
message

## Component
message-slide

## Visual
シンプルなクロージング。共有先として`#random`を小さく表示。

## Content
- 工夫ポイントは`#random`で共有
- 自分の現場で使える形に変換する
- Claude Codeの使い方も、チームで育てる

## Speaker Notes
最後は参加者の知見共有につなげます。Claude Codeの使い方は個人技になりやすいので、よかった工夫をチームに戻すことを促します。

## Source
なし

---

# Slide 57: アンケートと配布資料

## Message
ご清聴ありがとうございました。

## Layout
two-column

## Component
two-column

## Visual
左にアンケート、右に配布資料

## Content
アンケート:
- [フォームに回答する](https://forms.gle/CfB3Q9aVZQSVp3Uy9)
- ![QRコード](./img/qrcode_form.png)

配布資料:
- [後読み資料（notes.html）](./notes.html)
- スライドと同じURL配下から常時参照できます
- 質問・要望は社内チャットでも受付中

## Speaker Notes
なし

## Source
なし

---
