[日本語版はこちら](README.ja.md)

# Minecraft Bedrock Add-On TypeScript Template

This is a template for creating Minecraft Bedrock Add-Ons using TypeScript, based on the build tools used in the MCBEWorldEdit project.

## Getting Started

1.  **Rename the Project:**
    To rename your project, you can use the `npm run rename-project` command, which updates internal project settings and sub-directory names.
    ```bash
    npm run rename-project <YourNewProjectName>
    ```
    After running this command, you will also need to **manually rename the project's root directory** (e.g., `MCBEAddonTemplate`) to your desired new project name. If you need assistance with this manual step, a shell script can be provided to help automate this process outside of this CLI.

2.  **Update Project Name in `.env`:**
    Open the `.env` file and change the `PROJECT_NAME` to match your behavior and resource pack folder names. For example:
    ```
    PROJECT_NAME=MyNewAddon
    ```
    You should also rename the folders in `behavior_packs` and `resource_packs` to match.

3.  **Generate New UUIDs:**
    To automatically generate new UUIDs for your `manifest.json` files, first install the `uuid` package:
    ```bash
    npm install uuid
    ```
    Then, run the following command:
    ```bash
    npm run generate-uuid
    ```
    This command will automatically update the `header.uuid`, `modules[0].uuid`, and the interconnected `dependencies` UUIDs in both `behavior_packs/template_b/manifest.json` and `resource_packs/template_r/manifest.json`.
    **Important:** Ensure that the `dependencies` UUIDs correctly reference the `header` UUIDs of the corresponding packs for proper inter-pack communication.

4.  **Install Dependencies:**
    Open a terminal in your project directory and run:
    ```bash
    npm install
    ```

## Available Scripts

*   `npm run build`
    Builds the TypeScript code and prepares it for the game.

*   `npm run mcaddon`
    Builds the project and creates a `.mcaddon` file in the `dist/packages` directory, which you can use to easily install the add-on in Minecraft.

*   `npm run watch`
    Watches for changes in your source files (`.ts`, `.json`, etc.) and automatically rebuilds and packages the add-on.