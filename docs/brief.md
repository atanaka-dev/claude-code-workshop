---
title: Claude Codeを設計して使う
subtitle: 社内勉強会
audience:
  - Claude Codeをそれなりに使ったことがある社内メンバー
  - Claude Codeの基本操作は知っているが、より安定して使いこなしたい人
  - AIコーディングエージェントの運用・標準化に関心がある人
duration: 240min
outputs:
  slides: dist/index.html
  notes: dist/notes.html
---

<!-- markdownlint-disable MD025 -->

# Brief

## Purpose

Claude Codeを「なんとなく使う」状態から、「設計して使う」状態へアップデートする。

この勉強会では、Claude Codeを単なる会話相手ではなく、以下の3つを設計して使う対象として理解することを目的とする。

- 最初に何を渡すか
- 会話中に増える情報をどう運用するか
- 自然言語指示だけでは弱い部分をどう外部化・自動化するか

便利機能の紹介だけではなく、Claude Codeの動作原理や設計思想を踏まえて、実務で安定して使うための判断軸を持ち帰る。

## Audience

- Claude Codeのアカウント作成・インストールが済んでいる人
- Claude Codeをそれなりに使ったことがある人
- `/init`、`CLAUDE.md`、`/compact`、`/clear` などの単語を見たことがある、または利用経験がある人
- Claude Codeを「便利だけど不安定なツール」ではなく、設計・運用できる開発支援基盤として扱いたい人
- チームでClaude Codeの使い方を標準化・共有したい人

## Expected Outcome

参加者が、以下を理解し、自分のプロジェクトで判断・実践できる状態になる。

- `CLAUDE.md`、`rules`、`settings.json`、`docs`、`auto memory`の役割を区別できる
- `CLAUDE.md`に書くべき内容と、`docs`やSkillsへ逃がすべき内容を判断できる
- 会話が長くなることで起きるコンテキスト肥大化・情報欠落・Context Rotを説明できる
- `/compact`、`/clear`、`--continue`、`--resume`、`/branch`、`/rewind`などの使いどころを判断できる
- Skills、MCP、Hooks、Subagents、Pluginsを、限界突破のための役割分担として理解できる
- 自分のチームやプロジェクトで、Claude Codeの運用ルールや拡張方針を検討できる

## Key Message

Claude Codeを上手く使う人は、プロンプトだけでなく「情報の置き場所」「情報の寿命」「自然言語指示の限界」を設計している。

この勉強会の中心メッセージは以下の3つ。

- `CLAUDE.md`は短く、強く、行動に直結させる
- 長い会話は節目で整理し、必要な情報を外部化する
- 絶対に守らせたい処理や繰り返し作業は、設定・Hooks・Skillsなどへ逃がす

## Scope

この資料で扱う内容。

- Claude Codeに最初から渡される情報の設計
  - `CLAUDE.md`
  - `.claude/rules`
  - `settings.json`
  - `docs`
  - `auto memory`
- コンテキスト運用
  - コンテキスト肥大化
  - Microcompact / Auto-compact
  - bad autocompaction
  - Context Rot
  - `/compact`、`/clear`、セッション再開・分岐
- 自然言語指示の限界を超える拡張機能
  - Skills
  - MCP
  - Hooks
  - Subagents
  - Plugins
- ハンズオン
  - `CLAUDE.md`設計
  - 会話を切るタイミングの判断
  - SkillsやHooksなどの置き場所判断

## Out of Scope

この資料では以下を深掘りしない。

- Claude Codeの初回インストール・アカウント作成
- 基本的なCLI操作のチュートリアル
- Claude Code以外のAIエディタ・AIコーディングツール比較
- 各MCPサーバーの詳細な実装
- HooksやPluginsの本格的な実装演習
- 流出コードやリーク情報そのものの配布・詳細なコードリーディング
- セキュリティ監査や法務判断の代替

## Constraints

- 勉強会はオンライン開催
- 全体枠は4時間
  - 午前2時間
  - 休憩
  - 午後2時間
- 参加者はClaude Codeのアカウントをすでに持っている前提
- 参加者はClaude Codeをそれなりに利用したことがある前提
- 外部解析やリーク由来の内容は、現在の公式仕様を保証しない
- 講義では、外部解析情報を「観測された挙動からの仮説」として扱う
- 投影用スライドは1ページ1メッセージを守る
- 詳細説明や補足はSpeaker Notesまたは後読み資料へ逃がす

## Tone

- 実務的
- 具体的
- 経験者向け
- 原理から実践へつなげる
- 過度に便利機能紹介へ寄せない
- 断定しすぎない
- 失敗パターンも明示する
- 参加者からの知見共有を歓迎する

## Deliverables

- `dist/index.html`
- `dist/notes.html`
- `dist/assets/`
