# Minecraft Bedrock Add-On TypeScript テンプレート

このテンプレートは、TypeScript を使用して Minecraft Bedrock アドオンを開発するための基盤を提供します。MCBEWorldEdit プロジェクトで培われたビルドツールを基盤としています。

## 特徴

- **TypeScript サポート**: TypeScript コードは自動的に JavaScript にコンパイルされます。
- **自動ビルド**: ファイル変更時にプロジェクトが自動的にビルドされます。
- **ライブデプロイ**: 変更が自動的に Minecraft にデプロイされ、迅速なテストが可能です。
- **簡単なパッケージ化**: 配布用の `.mcaddon` ファイルを容易に作成できます。

## セットアップ

### 1. 初期設定

必要な依存関係をインストールします。

```bash
npm install
```

### 2. プロジェクト設定

プロジェクトをパーソナライズするために、プロジェクト名の変更と一意な識別子（UUID）の生成が必要です。

1.  **プロジェクト名の変更**:
    `<新しいプロジェクト名>` を希望する名前に置き換えて、以下のコマンドを実行します。
    ```bash
    npm run rename-project <新しいプロジェクト名>
    ```
    これにより、設定ファイルとディレクトリ名が更新されます。

2.  **新しい UUID の生成**:
    アドオンの一意性を保証するため、マニフェストファイル用に新しい UUID を生成します。
    ```bash
    npm run generate-uuid
    ```

### 3. 環境設定

ビルドツールが Minecraft のインストール先を正しく特定できるよう、`.env` ファイルを設定します。通常、このファイルは標準的な Windows インストールに合わせて事前設定されています。

- **`PROJECT_NAME`**: `rename-project` ステップで設定した名前と一致させる必要があります。
- **`MINECRAFT_PRODUCT`**: Windows 10/11 版の場合は `BedrockUWP` に設定します。
- **`CUSTOM_DEPLOYMENT_PATH`**: (任意) Minecraft のカスタムインストールパスがある場合に指定します。

### 4. `setup.js` の利用

`setup.js` スクリプトは、上記の初期設定ステップ（依存関係のインストール、プロジェクト名の変更、UUID の生成）を自動化します。

プロジェクトをセットアップするには、コマンドプロンプトまたは PowerShell で以下のコマンドを実行します。

```bash
npm run setup <新しいプロジェクト名>
```

例:
```bash
npm run setup MyAwesomeAddon
```

これにより、プロジェクトが指定した名前に設定され、必要な初期化がすべて行われます。

## スクリプト

- **`npm run build`**
  TypeScript コードをビルドし、ゲーム用に準備します。

- **`npm run local-deploy`**
  プロジェクトをビルドし、Minecraft の `development_packs` フォルダに自動的にデプロイします。このスクリプトはファイルの変更を監視し、自動的に再デプロイします。

- **`npm run watch`**
  `npm run local-deploy` のエイリアスです。

- **`npm run mcaddon`**
  プロジェクトをビルドし、`dist/packages` ディレクトリに `.mcaddon` ファイルを作成します。これにより、アドオンのインストールや配布が容易になります。

- **`npm run lint`**
  TypeScript コードのスタイルと品質の問題をチェックします。

- **`npm run clean`**
  一時的なビルドファイルとディレクトリを削除します。
