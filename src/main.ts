import { system } from "@minecraft/server";

system.beforeEvents.startup.subscribe(() => {
    console.log("MCBEAddonTemplate loaded!");
});
