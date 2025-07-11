const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

async function setup() {
    console.log('\n=======================================================');
    console.log(' Minecraft Bedrock Add-On Project Setup');
    console.log('=======================================================\n');

    let projectName = process.argv[2]; // Get project name from command line argument

    if (!projectName) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        projectName = await new Promise(resolve => {
            rl.question('Please enter the new project name: ', answer => {
                rl.close();
                resolve(answer);
            });
        });
    }

    if (!projectName) {
        console.error('[ERROR] Project name cannot be empty. Exiting.');
        process.exit(1);
    }

    console.log(`Project name set to: ${projectName}\n`);

    // Step 1: Install dependencies
    console.log('[Step 1/4] Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('[SUCCESS] Dependencies installed.\n');
    } catch (error) {
        console.error('[ERROR] Failed to install dependencies. Please check your Node.js and npm installation.');
        console.error(error.message);
        process.exit(1);
    }

    // Step 2: Rename project files and configurations
    console.log(`[Step 2/4] Renaming project files and configurations to "${projectName}"...`);
    try {
        execSync(`npm run rename-project ${projectName}`, { stdio: 'inherit' });
        console.log('[SUCCESS] Project internals renamed.\n');
    } catch (error) {
        console.error('[ERROR] Failed to rename the project internals.');
        console.error(error.message);
        process.exit(1);
    }

    // Step 3: Generate new UUIDs
    console.log('[Step 3/4] Generating new UUIDs for manifest files...');
    try {
        execSync(`npm run generate-uuid ${projectName}`, { stdio: 'inherit' });
        console.log('[SUCCESS] New UUIDs generated.\n');
    } catch (error) {
        console.error('[ERROR] Failed to generate UUIDs.');
        console.error(error.message);
        process.exit(1);
    }

    // Step 4: Prepare to rename the project root directory
    console.log('[Step 4/4] Preparing to rename the project root directory...\n');

    const currentDir = process.cwd();
    const currentDirName = path.basename(currentDir);
    const parentDir = path.dirname(currentDir);
    const renamerScriptPath = path.join(parentDir, '_renamer.js'); // Use .js for the renamer script

    const renamerScriptContent = `\nconst fs = require('fs');\nconst path = require('path');\n\nconst oldName = process.argv[2];\nconst newName = process.argv[3];\nconst targetDir = process.argv[4]; // The directory to rename (e.g., E:/MinecraftDev/projects/MCBEAddonTemplate/template_project)\n\nconsole.log('\nRenaming Project Directory');\nconsole.log('Renaming directory from "' + oldName + '" to "' + newName + '"...');\n\n// Wait a bit to ensure the current process (setup.js) has exited\nsetTimeout(() => {\n    try {\n        fs.renameSync(targetDir, path.join(path.dirname(targetDir), newName));\n        console.log('[SUCCESS] Project directory has been renamed.');\n    } catch (error) {\n        console.error('[ERROR] Failed to rename the directory. It might be in use or permissions issue.');\n        console.error(error.message);\n        process.exit(1);\n    }\n\n    console.log('\nThis temporary window will close in 3 seconds...');\n    setTimeout(() => {\n        // Delete the renamer script itself\n        try {\n            fs.unlinkSync(path.join(__dirname, path.basename(process.argv[1])));\n        } catch (error) {\n            console.error('Failed to delete renamer script:', error.message);\n        }\n        process.exit(0);\n    }, 3000);\n}, 2000); // Wait 2 seconds\n`;

    fs.writeFileSync(renamerScriptPath, renamerScriptContent);

    console.log('A new window will open to finalize the directory renaming.\n');
    console.log('=======================================================');
    console.log(' Setup Complete!');
    console.log('=======================================================\n');
    console.log('This window will now close.');

    // Start the renamer script from the parent directory
    // Use 'start cmd /c node' on Windows to open a new console window and execute the script
    // Pass currentDirName, projectName, and currentDir as arguments to the renamer script
    execSync(`start cmd /c node "${renamerScriptPath}" "${currentDirName}" "${projectName}" "${currentDir}"`, { stdio: 'ignore', detached: true });

    process.exit(0);
}

setup();
