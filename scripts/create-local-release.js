const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commitMessage = process.argv[2];

if (!commitMessage) {
    console.error('Usage: node scripts/create-local-release.js "<commit message>"');
    process.exit(1);
}

try {
    // Read package.json to get current version
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let currentVersion = packageJson.version;

    // Increment patch version
    const versionParts = currentVersion.split('.').map(Number);
    versionParts[2]++; // Increment patch version
    const newVersion = versionParts.join('.');

    console.log(`Creating local release v${newVersion}...`);

    // 1. Commit current changes
    console.log('Committing changes...');
    execSync(`git add .`, { stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log('Changes committed.');

    // Update package.json version
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(`Updated package.json version to v${newVersion}`);

    // 2. Create new version tag
    console.log(`Creating tag v${newVersion}...`);
    execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
    console.log(`Tag v${newVersion} created.`);

    // 3. Build project
    console.log('Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Project built.');

    // 4. Create .mcaddon
    console.log('Creating .mcaddon...');
    execSync('npm run mcaddon', { stdio: 'inherit' });
    console.log('.mcaddon created.');

    console.log(`\nLocal release v${newVersion} created successfully!`);
    console.log('You can find the .mcaddon file in the dist/packages directory.');

} catch (error) {
    console.error('Error creating local release:', error.message);
    process.exit(1);
}