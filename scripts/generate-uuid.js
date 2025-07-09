const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const behaviorPackManifestPath = 'behavior_packs/template_b/manifest.json';
const resourcePackManifestPath = 'resource_packs/template_r/manifest.json';

try {
    // Behavior Pack Manifest
    const bpAbsolutePath = path.join(process.cwd(), behaviorPackManifestPath);
    const bpManifest = JSON.parse(fs.readFileSync(bpAbsolutePath, 'utf8'));

    const newBpHeaderUuid = uuidv4();
    const newBpModuleUuid = uuidv4();

    bpManifest.header.uuid = newBpHeaderUuid;
    bpManifest.modules[0].uuid = newBpModuleUuid;

    // Resource Pack Manifest
    const rpAbsolutePath = path.join(process.cwd(), resourcePackManifestPath);
    const rpManifest = JSON.parse(fs.readFileSync(rpAbsolutePath, 'utf8'));

    const newRpHeaderUuid = uuidv4();
    const newRpModuleUuid = uuidv4();

    rpManifest.header.uuid = newRpHeaderUuid;
    rpManifest.modules[0].uuid = newRpModuleUuid;

    // Set dependencies
    // BP depends on RP
    const bpDependencyIndex = bpManifest.dependencies.findIndex(dep => dep.uuid === "PLEASE_REPLACE_WITH_NEW_UUID_3");
    if (bpDependencyIndex !== -1) {
        bpManifest.dependencies[bpDependencyIndex].uuid = newRpHeaderUuid;
    } else {
        // If not found, add it (or handle error)
        console.warn(`Dependency with UUID "PLEASE_REPLACE_WITH_NEW_UUID_3" not found in ${behaviorPackManifestPath}. Adding new dependency.`);
        bpManifest.dependencies.push({
            "uuid": newRpHeaderUuid,
            "version": [1, 0, 0]
        });
    }

    // RP depends on BP
    const rpDependencyIndex = rpManifest.dependencies.findIndex(dep => dep.uuid === "PLEASE_REPLACE_WITH_NEW_UUID_1");
    if (rpDependencyIndex !== -1) {
        rpManifest.dependencies[rpDependencyIndex].uuid = newBpHeaderUuid;
    } else {
        // If not found, add it (or handle error)
        console.warn(`Dependency with UUID "PLEASE_REPLACE_WITH_NEW_UUID_1" not found in ${resourcePackManifestPath}. Adding new dependency.`);
        rpManifest.dependencies.push({
            "uuid": newBpHeaderUuid,
            "version": [1, 0, 0]
        });
    }

    // Write back
    fs.writeFileSync(bpAbsolutePath, JSON.stringify(bpManifest, null, 2), 'utf8');
    console.log(`Updated UUIDs in ${behaviorPackManifestPath}`);

    fs.writeFileSync(rpAbsolutePath, JSON.stringify(rpManifest, null, 2), 'utf8');
    console.log(`Updated UUIDs in ${resourcePackManifestPath}`);

} catch (error) {
    console.error(`Error updating manifest files:`, error);
}