const fs = require('fs');
const path = require('path');

const newProjectName = process.argv[2]; // Get new project name from command line argument

if (!newProjectName) {
    console.error('Usage: node scripts/rename-project.js <new-project-name>');
    process.exit(1);
}

const currentProjectName = 'MCBEAddonTemplate'; // Assuming this is the initial project name

// Function to find the current behavior pack or resource pack directory name
function findPackDirectory(basePath, suffix) {
    const fullPath = path.join(process.cwd(), basePath);
    if (!fs.existsSync(fullPath)) {
        return null; // Base path does not exist
    }
    const directories = fs.readdirSync(fullPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name.endsWith(suffix))
        .map(dirent => dirent.name);
    return directories.length > 0 ? directories[0] : null;
}

// Function to update JSON files
function updateJsonFile(filePath, updateFn) {
    const absolutePath = path.join(process.cwd(), filePath);
    try {
        if (!fs.existsSync(absolutePath)) {
            console.warn(`Skipping update for ${filePath}: File not found.`);
            return;
        }
        const content = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
        updateFn(content);
        fs.writeFileSync(absolutePath, JSON.stringify(content, null, 2), 'utf8');
        console.log(`Updated ${filePath}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
    }
}

// Function to update .env file
function updateEnvFile(filePath) {
    const absolutePath = path.join(process.cwd(), filePath);
    try {
        if (!fs.existsSync(absolutePath)) {
            console.warn(`Skipping update for ${filePath}: File not found.`);
            return;
        }
        let content = fs.readFileSync(absolutePath, 'utf8');
        
        const newProjectNameFormatted = newProjectName.toLowerCase().replace(/\s/g, '_');
        
        content = content.replace(`PROJECT_NAME=${currentProjectName}`, `PROJECT_NAME=${newProjectName}`);
        content = content.replace(/BEHAVIOR_PACK_DIR_NAME=.*/, `BEHAVIOR_PACK_DIR_NAME=${newProjectNameFormatted}_b`);
        content = content.replace(/RESOURCE_PACK_DIR_NAME=.*/, `RESOURCE_PACK_DIR_NAME=${newProjectNameFormatted}_r`);
        
        fs.writeFileSync(absolutePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
    }
}

// Update .env
updateEnvFile('.env');

// Update package.json
updateJsonFile('package.json', (content) => {
    content.name = newProjectName.toLowerCase().replace(/\s/g, '-'); // npm package names are usually lowercase and hyphenated
    content.productName = newProjectName;
});

// Dynamically find current pack directory names
const currentBpDir = findPackDirectory('behavior_packs', '_b') || 'template_b';
const currentRpDir = findPackDirectory('resource_packs', '_r') || 'template_r';

const newProjectNameFormatted = newProjectName.toLowerCase().replace(/\s/g, '_');
const newBpDir = `${newProjectNameFormatted}_b`;
const newRpDir = `${newProjectNameFormatted}_r`;

// Update behavior_packs/currentBpDir/manifest.json
updateJsonFile(`behavior_packs/${currentBpDir}/manifest.json`, (content) => {
    content.header.name = `${newProjectName} Behavior Pack`;
});

// Update resource_packs/currentRpDir/manifest.json
updateJsonFile(`resource_packs/${currentRpDir}/manifest.json`, (content) => {
    content.header.name = `${newProjectName} Resource Pack`;
});

// Rename directories
try {
    const oldBpPath = path.join(process.cwd(), 'behavior_packs', currentBpDir);
    const newBpPath = path.join(process.cwd(), 'behavior_packs', newBpDir);
    if (fs.existsSync(oldBpPath) && !fs.existsSync(newBpPath)) {
        fs.renameSync(oldBpPath, newBpPath);
        console.log(`Renamed ${oldBpPath} to ${newBpPath}`);
    } else if (fs.existsSync(newBpPath)) {
        console.log(`Skipping rename for behavior pack: ${newBpPath} already exists.`);
    } else {
        console.warn(`Skipping rename for behavior pack: ${oldBpPath} not found.`);
    }

    const oldRpPath = path.join(process.cwd(), 'resource_packs', currentRpDir);
    const newRpPath = path.join(process.cwd(), 'resource_packs', newRpDir);
    if (fs.existsSync(oldRpPath) && !fs.existsSync(newRpPath)) {
        fs.renameSync(oldRpPath, newRpPath);
        console.log(`Renamed ${oldRpPath} to ${newRpPath}`);
    } else if (fs.existsSync(newRpPath)) {
        console.log(`Skipping rename for resource pack: ${newRpPath} already exists.`);
    } else {
        console.warn(`Skipping rename for resource pack: ${oldRpPath} not found.`);
    }
} catch (error) {
    console.error('Error renaming directories:', error);
}

console.log(`Project name changed to ${newProjectName}`);
console.log(`\nIMPORTANT: Please manually rename your project's root folder from "${currentProjectName}" to "${newProjectName}" to complete the renaming process.`);