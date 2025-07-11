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
    console.log('[Step 1/3] Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('[SUCCESS] Dependencies installed.\n');
    } catch (error) {
        console.error('[ERROR] Failed to install dependencies. Please check your Node.js and npm installation.');
        console.error(error.message);
        process.exit(1);
    }

    // Step 2: Rename project files and configurations
    console.log(`[Step 2/3] Renaming project files and configurations to "${projectName}"...`);
    try {
        execSync(`npm run rename-project ${projectName}`, { stdio: 'inherit' });
        console.log('[SUCCESS] Project internals renamed.\n');
    } catch (error) {
        console.error('[ERROR] Failed to rename the project internals.');
        console.error(error.message);
        process.exit(1);
    }

    // Step 3: Generate new UUIDs
    console.log('[Step 3/3] Generating new UUIDs for manifest files...');
    try {
        execSync(`npm run generate-uuid ${projectName}`, { stdio: 'inherit' });
        console.log('[SUCCESS] New UUIDs generated.\n');
    } catch (error) {
        console.error('[ERROR] Failed to generate UUIDs.');
        console.error(error.message);
        process.exit(1);
    }

    console.log('=======================================================');
    console.log(' Setup Complete!');
    console.log('=======================================================\n');
    console.log('This window will now close.');

    process.exit(0);
}

setup();