const fs = require('fs');
const path = require('path');

const newProjectName = process.argv[2]; // Get new project name from command line argument

if (!newProjectName) {
    console.error('Usage: node scripts/rename-project.js <new-project-name>');
    process.exit(1);
}

const currentProjectName = 'MCBEAddonTemplate'; // Assuming this is the initial project name

// Function to update JSON files
function updateJsonFile(filePath, updateFn) {
    const absolutePath = path.join(process.cwd(), filePath);
    try {
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
        let content = fs.readFileSync(absolutePath, 'utf8');
        content = content.replace(`PROJECT_NAME=${currentProjectName}`, `PROJECT_NAME=${newProjectName}`);
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

// Update behavior_packs/template_b/manifest.json
updateJsonFile('behavior_packs/template_b/manifest.json', (content) => {
    content.header.name = `${newProjectName} Behavior Pack`;
});

// Update resource_packs/template_r/manifest.json
updateJsonFile('resource_packs/template_r/manifest.json', (content) => {
    content.header.name = `${newProjectName} Resource Pack`;
});

// Rename directories
try {
    fs.renameSync(path.join(process.cwd(), 'behavior_packs/template_b'), path.join(process.cwd(), `behavior_packs/${newProjectName.toLowerCase().replace(/\s/g, '_')}_b`));
    console.log(`Renamed behavior_packs/template_b to behavior_packs/${newProjectName.toLowerCase().replace(/\s/g, '_')}_b`);
    fs.renameSync(path.join(process.cwd(), 'resource_packs/template_r'), path.join(process.cwd(), `resource_packs/${newProjectName.toLowerCase().replace(/\s/g, '_')}_r`));
    console.log(`Renamed resource_packs/template_r to resource_packs/${newProjectName.toLowerCase().replace(/\s/g, '_')}_r`);
} catch (error) {
    console.error('Error renaming directories:', error);
}

console.log(`Project name changed to ${newProjectName}`);
console.log(`\nIMPORTANT: Please manually rename your project's root folder from "${currentProjectName}" to "${newProjectName}" to complete the renaming process.`);