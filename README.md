# Typing Game

[![My Skills](https://skillicons.dev/icons?i=js,ts,react,firebase,yarn,css,vscode)](https://skillicons.dev)

## 概要
数字と記号のタイピングゲーム
経過時間、正しく打ったキーの数、平均キータイプ数、ミスタイプ数、正確率を記録

Reactを使用して作成

アルバイトの研修で作ったものなのでまだ改善の余地があります・・・

## コマンド
- リポジトリのクローン
    ```
    git clone https://github.com/mittiiiiiiiii/Typing-Game.git
    ```
- ローカルホストの起動
    ```
    yarn start
    ```
- テストを実行
    ```bash
    yarn test
    ```

## Deploy
[Webアプリ版](https://typing-game-f6a11.web.app)

## UI
![画面遷移図](./UI/コンポーネント.png)

![コンポーネント](./UI/画面遷移図.png)

## アプリを作成
- フォルダ構造を整理
- 直接gameやresultへのアクセスを禁止
- TSに変更
- Startコンポーネントの実装
    - 基本的なレイアウトを作成
    - Gameコンポーネントへ遷移する機能を実装
    - テストを実装
- Gameコンポーネントの実装
    - 基本的なレイアウトを作成
    - Startコンポーネントへ遷移する機能を実装
    - データをカウントする機能を実装
    - テストを実装
- Resultコンポーネントの実装
    - 基本的なレイアウトを作成
    - Startコンポーネントへ遷移する機能を実装
    - カウントしたデータを表示する機能を実装
    - テストを実装