# Minecraft Bedrock Add-On TypeScript Template

This is a template for creating Minecraft Bedrock Add-Ons using TypeScript, based on the build tools used in the MCBEWorldEdit project.

## Getting Started

1.  **Rename the Project:**
    Rename the `MCBEAddonTemplate` directory to whatever you want to call your project.

2.  **Update Project Name in `.env`:**
    Open the `.env` file and change the `PROJECT_NAME` to match your behavior and resource pack folder names. For example:
    ```
    PROJECT_NAME=MyNewAddon
    ```
    You should also rename the folders in `behavior_packs` and `resource_packs` to match.

3.  **Generate New UUIDs:**
    Open the `manifest.json` files in your behavior and resource pack folders.
    You need to replace all instances of `PLEASE_REPLACE_WITH_NEW_UUID_...` with new, unique UUIDs. You can generate UUIDs using an online tool like [uuidgenerator.net](https://www.uuidgenerator.net/).
    **Important:** Make sure the UUIDs in the `dependencies` sections correctly reference the UUIDs in the `header` sections of the corresponding packs.

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
