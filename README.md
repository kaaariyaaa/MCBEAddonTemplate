[日本語版はこちら](README.ja.md)

# Minecraft Bedrock Add-On TypeScript Template

This is a template for creating Minecraft Bedrock Add-Ons using TypeScript, based on the build tools used in the MCBEWorldEdit project.

## Features

- **TypeScript Support**: Write your code in TypeScript and have it automatically compiled to JavaScript.
- **Automatic Builds**: The template is configured to automatically build your project when you make changes.
- **Live Deployment**: Automatically deploy your add-on to Minecraft for rapid testing.
- **Easy Packaging**: Create a `.mcaddon` file for easy distribution.

## Getting Started

### 1. Initial Setup

First, install the necessary dependencies:

```bash
npm install
```

### 2. Project Configuration

To personalize your project, you need to rename it and generate new unique identifiers (UUIDs).

1.  **Rename the Project**:
    Run the following command, replacing `<YourNewProjectName>` with your desired project name:
    ```bash
    npm run rename-project <YourNewProjectName>
    ```
    This will update configuration files and directory names within the project.

2.  **Generate New UUIDs**:
    To ensure your add-on is unique, generate new UUIDs for the manifest files:
    ```bash
    npm run generate-uuid
    ```

### 3. Environment Configuration

For the build tools to correctly locate your Minecraft installation, you need to configure the `.env` file. This file is usually pre-configured for standard Windows installations.

- **`PROJECT_NAME`**: Should match the name you set in the `rename-project` step.
- **`MINECRAFT_PRODUCT`**: Set to `BedrockUWP` for the Windows 10/11 Edition.
- **`CUSTOM_DEPLOYMENT_PATH`**: (Optional) If you have a custom Minecraft installation path, specify it here.

## Available Scripts

- **`npm run build`**
  Builds the TypeScript code and prepares it for the game.

- **`npm run local-deploy`**
  Builds the project and automatically deploys it to your Minecraft `development_packs` folder. This script will continue running, watching for file changes and redeploying automatically.

- **`npm run watch`**
  A convenient alias for `npm run local-deploy`.

- **`npm run mcaddon`**
  Builds the project and creates a `.mcaddon` file in the `dist/packages` directory, which you can use to easily install or distribute the add-on.

- **`npm run lint`**
  Lints your TypeScript code to check for style and quality issues.

- **`npm run clean`**
  Removes temporary build files and directories.
