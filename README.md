[日本語版はこちら](README.ja.md)

# Minecraft Bedrock Add-On TypeScript Template

This template provides a foundation for developing Minecraft Bedrock Add-Ons using TypeScript, based on the build tools from the MCBEWorldEdit project.

## Features

- **TypeScript Support**: TypeScript code is automatically compiled to JavaScript.
- **Automatic Builds**: The project is automatically built when files are changed.
- **Live Deployment**: Changes are automatically deployed to Minecraft for rapid testing.
- **Easy Packaging**: Easily create `.mcaddon` files for distribution.

## Setup

### 1. Initial Setup

Install the necessary dependencies:

```bash
npm install
```

### 2. Project Configuration

To personalize your project, you need to rename it and generate unique identifiers (UUIDs).

1.  **Rename the Project**:
    Replace `<YourNewProjectName>` with your desired name and run the following command:
    ```bash
    npm run rename-project <YourNewProjectName>
    ```
    This will update configuration files and directory names.

2.  **Generate New UUIDs**:
    To ensure the uniqueness of your add-on, generate new UUIDs for the manifest files:
    ```bash
    npm run generate-uuid
    ```

### 3. Environment Configuration

To allow the build tools to correctly locate your Minecraft installation, configure the `.env` file. This file is usually pre-configured for standard Windows installations.

- **`PROJECT_NAME`**: Must match the name set in the `rename-project` step.
- **`MINECRAFT_PRODUCT`**: Set to `BedrockUWP` for the Windows 10/11 Edition.
- **`CUSTOM_DEPLOYMENT_PATH`**: (Optional) Specify if you have a custom Minecraft installation path.

### 4. Using `setup.bat` (Windows Only)

This script can also be launched directly from File Explorer.

The `setup.bat` script automates the initial setup steps (installing dependencies, renaming the project, generating UUIDs, and renaming the project directory itself). It is only available for Windows environments.

To set up your project, run the following command in Command Prompt or PowerShell:

```bash
setup.bat <YourNewProjectName>
```

Example:
```bash
setup.bat MyAwesomeAddon
```

This will configure your project with the specified name and perform all necessary initializations.

## Available Scripts

- **`npm run build`**
  Builds the TypeScript code and prepares it for the game.

- **`npm run local-deploy`**
  Builds the project and automatically deploys it to your Minecraft `development_packs` folder. This script watches for file changes and redeploys automatically.

- **`npm run watch`**
  An alias for `npm run local-deploy`.

- **`npm run mcaddon`**
  Builds the project and creates a `.mcaddon` file in the `dist/packages` directory, making add-on installation and distribution easy.

- **`npm run lint`**
  Checks TypeScript code for style and quality issues.

- **`npm run clean`**
  Removes temporary build files and directories.