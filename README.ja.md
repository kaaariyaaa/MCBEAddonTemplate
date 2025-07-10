[English version here](README.md)

# Minecraft Bedrock Add-On TypeScript テンプレート

これは、MCBEWorldEdit プロジェクトで使用されているビルドツールに基づいた、TypeScript を使用して Minecraft Bedrock アドオンを作成するためのテンプレートです。

## 主な機能

- **TypeScriptサポート**: TypeScriptで記述したコードは、自動的にJavaScriptにコンパイルされます。
- **自動ビルド**: ファイルを変更すると、プロジェクトが自動的にビルドされるように設定されています。
- **ライブデプロイ**: アドオンを自動的にMinecraftにデプロイし、迅速なテストを可能にします。
- **簡単なパッケージ化**: 配布しやすい`.mcaddon`ファイルを簡単に作成できます。

## はじめに

### 1. 初期セットアップ

まず、必要な依存関係をインストールします。

```bash
npm install
```

### 2. プロジェクトの構成

プロジェクトをパーソナライズするために、名前の変更と新しい一意な識別子（UUID）の生成が必要です。

1.  **プロジェクト名の変更**:
    `<新しいプロジェクト名>` を希望するプロジェクト名に置き換えて、次のコマンドを実行します。
    ```bash
    npm run rename-project <新しいプロジェクト名>
    ```
    これにより、プロジェクト内の設定ファイルとディレクトリ名が更新されます。

2.  **新しいUUIDの生成**:
    アドオンが一意であることを保証するために、マニフェストファイル用に新しいUUIDを生成します。
    ```bash
    npm run generate-uuid
    ```

### 3. 環境設定

ビルドツールがMinecraftのインストール先を正しく見つけられるように、`.env`ファイルを構成する必要があります。通常、このファイルは標準的なWindowsのインストールに合わせて事前設定されています。

- **`PROJECT_NAME`**: `rename-project`ステップで設定した名前と一致させる必要があります。
- **`MINECRAFT_PRODUCT`**: Windows 10/11版の場合は`BedrockUWP`に設定します。
- **`CUSTOM_DEPLOYMENT_PATH`**: (任意) Minecraftのインストールパスがカスタムの場合は、ここに指定します。

## 利用可能なスクリプト

- **`npm run build`**
  TypeScriptコードをビルドし、ゲーム用に準備します。

- **`npm run local-deploy`**
  プロジェクトをビルドし、Minecraftの`development_packs`フォルダに自動的にデプロイします。このスクリプトは実行し続け、ファイルの変更を監視して自動的に再デプロイします。

- **`npm run watch`**
  `npm run local-deploy`の便利なエイリアスです。

- **`npm run mcaddon`**
  プロジェクトをビルドし、`dist/packages`ディレクトリに`.mcaddon`ファイルを作成します。これを使用して、アドオンを簡単にインストールしたり配布したりできます。

- **`npm run lint`**
  TypeScriptコードのスタイルや品質の問題をチェックします。

- **`npm run clean`**
  一時的なビルドファイルとディレクトリを削除します。