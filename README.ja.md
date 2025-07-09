[English version here](README.md)

# Minecraft Bedrock Add-On TypeScript テンプレート

これは、MCBEWorldEdit プロジェクトで使用されているビルドツールに基づいた、TypeScript を使用して Minecraft Bedrock アドオンを作成するためのテンプレートです。

## はじめに

1.  **プロジェクト名の変更:**
    プロジェクト名を変更するには、内部のプロジェクト設定とサブディレクトリ名を更新する `npm run rename-project` コマンドを使用できます。
    ```bash
    npm run rename-project <新しいプロジェクト名>
    ```
    このコマンドを実行した後、プロジェクトのルートディレクトリ（例: `MCBEAddonTemplate`）を希望する新しいプロジェクト名に**手動で変更する**必要があります。この手動の手順についてサポートが必要な場合は、この CLI の外部でこのプロセスを自動化するのに役立つシェルスクリプトを提供できます。

2.  **`.env` ファイルのプロジェクト名の更新:**
    `.env` ファイルを開き、`PROJECT_NAME` をビヘイビアパックとリソースパックのフォルダ名と一致するように変更します。例:
    ```
    PROJECT_NAME=MyNewAddon
    ```
    `behavior_packs` および `resource_packs` 内のフォルダ名も一致するように変更する必要があります。

3.  **新しい UUID の生成:**
    `manifest.json` ファイルの新しい UUID を自動的に生成するには、まず `uuid` パッケージをインストールします。
    ```bash
    npm install uuid
    ```
    次に、次のコマンドを実行します。
    ```bash
    npm run generate-uuid
    ```
    このコマンドは、`behavior_packs/template_b/manifest.json` と `resource_packs/template_r/manifest.json` の両方で、`header.uuid`、`modules[0].uuid`、および相互接続された `dependencies` UUID を自動的に更新します。
    **重要:** パック間の適切な相互通信のために、`dependencies` UUID が対応するパックの `header` UUID を正しく参照していることを確認してください。

4.  **依存関係のインストール:**
    プロジェクトディレクトリでターミナルを開き、以下を実行します。
    ```bash
    npm install
    ```

## 利用可能なスクリプト

*   `npm run build`
    TypeScript コードをビルドし、ゲーム用に準備します。

*   `npm run mcaddon`
    プロジェクトをビルドし、`dist/packages` ディレクトリに `.mcaddon` ファイルを作成します。これを使用して、Minecraft にアドオンを簡単にインストールできます。

*   `npm run watch`
    ソースファイル（`.ts`、`.json` など）の変更を監視し、アドオンを自動的に再ビルドしてパッケージ化します。

*   `npm run create-local-release "<コミットメッセージ>"`
    現在の変更をコミットし、`package.json` のパッチバージョンをインクリメントし、新しい Git タグを作成し、プロジェクトをビルドして、`.mcaddon` ファイルを生成します。`<コミットメッセージ>` を希望するコミットメッセージに置き換えてください。
