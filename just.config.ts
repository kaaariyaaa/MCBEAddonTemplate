import { argv, parallel, series, task, tscTask } from "just-scripts";
import {
  CopyTaskParameters,
  cleanTask,
  cleanCollateralTask,
  copyTask,
  coreLint,
  mcaddonTask,
  setupEnvironment,
  ZipTaskParameters,
  STANDARD_CLEAN_PATHS,
  DEFAULT_CLEAN_DIRECTORIES,
  getOrThrowFromProcess,
  watchTask,
} from "@minecraft/core-build-tasks";
import path from "path";
import { rolldown } from "rolldown";

// Setup env variables
setupEnvironment(path.resolve(__dirname, ".env"));
const projectName = getOrThrowFromProcess("PROJECT_NAME");

// You can use `npm run build:production` to build a "production" build that strips out statements labelled with "dev:".
const isProduction = argv()["production"];

const rolldownTask = async () => {
  const build = await rolldown({
    input: path.join(__dirname, "./src/main.ts"),
    external: ["@minecraft/server", "@minecraft/server-ui"],
  });
  await build.write({
    file: path.resolve(__dirname, "./dist/scripts/main.js"),
    format: "es",
    sourcemap: true,
  });
};

const behaviorPackDirName = getOrThrowFromProcess("BEHAVIOR_PACK_DIR_NAME");
const resourcePackDirName = getOrThrowFromProcess("RESOURCE_PACK_DIR_NAME");

const copyTaskOptions: CopyTaskParameters = {
  copyToBehaviorPacks: [`./behavior_packs/${behaviorPackDirName}`],
  copyToScripts: ["./dist/scripts"],
  copyToResourcePacks: [`./resource_packs/${resourcePackDirName}`],
};

const mcaddonTaskOptions: ZipTaskParameters = {
  ...copyTaskOptions,
  outputFile: `./dist/packages/${projectName}.mcaddon`,
};

// Lint
task("lint", coreLint(["src/**/*.ts"], argv().fix));

// Build
task("typescript", tscTask());
task("bundle", rolldownTask);
task("build", series("typescript", "bundle"));

// Clean
task("clean-local", cleanTask(DEFAULT_CLEAN_DIRECTORIES));
task("clean-collateral", cleanCollateralTask(STANDARD_CLEAN_PATHS));
task("clean", parallel("clean-local", "clean-collateral"));

// Package
task("copyArtifacts", copyTask(copyTaskOptions));
task("package", series("clean-collateral", "copyArtifacts"));

// Local Deploy used for deploying local changes directly to output via the bundler. It does a full build and package first just in case.
task(
  "local-deploy",
  watchTask(
    [
      "src/**/*.ts",
      `behavior_packs/${behaviorPackDirName}/**/*.{json,lang,png}`,
      `resource_packs/${resourcePackDirName}/**/*.{json,lang,png}`,
    ],
    series("build", "package")
  )
);

// Mcaddon
task("createMcaddonFile", mcaddonTask(mcaddonTaskOptions));
task("mcaddon", series("clean-local", "build", "createMcaddonFile"));