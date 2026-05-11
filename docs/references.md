# References

このファイルには、資料で参照する外部情報、公式ドキュメント、社内資料、参考リンクを記録する。

## Format

```md
## Source Name

- URL:
- Type:
- Used in:
- Summary:
- Notes:
```

## Claude Code Docs

- URL: <https://code.claude.com/docs/ja/overview>
- Type: 公式ドキュメント
- Used in: 全体の公式仕様確認
- Summary: Claude Codeの概要、設定、コマンド、拡張機能などを確認するための公式ドキュメント。
- Notes: 仕様確認の一次情報として扱う。

## How Claude Code Builds a System Prompt

- URL: <https://www.dbreunig.com/2026/04/04/how-claude-code-builds-a-system-prompt.html>
- Type: 外部分析記事
- Used in: 第1部のプロンプト組み立て解説
- Summary: Claude Codeがシステムプロンプトをどのように構成しているかを分析した記事。
- Notes: 公式仕様ではないため、観測に基づく補助情報として扱う。

## ultraworkers/claw-code

- URL: <https://github.com/ultraworkers/claw-code>
- Type: 公開ソースコードリーク解析
- Used in: 第1部・第2部の内部原理解説
- Summary: Claude Codeの内部挙動を推測するために参照した公開リポジトリ。
- Notes: リーク由来の可能性があるため、講義では現在仕様の断定ではなく仮説として扱う。

## asgeirtj/system_prompts_leaks

- URL: <https://github.com/asgeirtj/system_prompts_leaks>
- Type: 公開ソースコードリーク解析
- Used in: 第1部・第2部のプロンプト/圧縮挙動の補助説明
- Summary: 各種AIシステムのプロンプトリークを収集した公開リポジトリ。
- Notes: 公式情報ではないため、補助情報として慎重に扱う。

## Claude Code source leak analysis

- URL: <https://www.sabrina.dev/p/claude-code-source-leak-analysis>
- Type: 公開ソースコードリーク解析
- Used in: 第2部のcompaction/内部挙動の補助説明
- Summary: Claude Codeのソースリークとされる情報をもとに、内部挙動を分析した記事。
- Notes: 実装は変更される可能性があるため、観測された挙動の仮説として扱う。

## Context Rot: How Increasing Input Tokens Impacts LLM Performance

- URL: <https://www.trychroma.com/research/context-rot>
- Type: コンテキスト劣化に関する研究
- Used in: 第2部のContext Rot解説
- Summary: 入力トークン数の増加がLLMの性能に与える影響を分析した研究記事。
- Notes: Claude Code固有ではなく、長文コンテキストを扱うLLM一般の劣化説明として参照する。

## Lost in the Middle: How Language Models Use Long Contexts

- URL: <https://arxiv.org/abs/2307.03172>
- Type: コンテキスト劣化に関する研究
- Used in: 第2部のLost in the Middle解説
- Summary: 長いコンテキスト内で、言語モデルが中央付近の情報を見落としやすい問題を扱った論文。
- Notes: Context Rotの一要因として紹介する。

## Context Rot: The Complete Guide to Why LLMs Degrade as Context Grows

- URL: <https://www.morphllm.com/context-rot>
- Type: コンテキスト劣化に関する研究
- Used in: 第2部のContext Rot補助説明
- Summary: コンテキストが長くなるほどLLMの応答品質が劣化する理由を整理した解説記事。
- Notes: 公式研究ではなく補助的な解説として扱う。
