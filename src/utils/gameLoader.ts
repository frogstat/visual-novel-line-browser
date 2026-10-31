import type {LoaderFunctionArgs} from "react-router-dom";
import {loadJson} from "./loadJson.ts";
import type {GameData} from "../hooks/useGameManifest.ts";
import type {Game} from "./types.ts";

export async function loadGame({params}: LoaderFunctionArgs<any>): Promise<Game> {
    const gameFolder = params.gameFolder;
    if (!gameFolder) {
        throw new Error("No game selected");
    }
    const manifest = await loadJson<GameData>("/manifest.json");
    const foundKey = Object.keys(manifest).find(key => key.toLowerCase() === gameFolder.toLowerCase());
    if (!foundKey) {
        throw new Error(`Game "${gameFolder}" not found`);
    }
    return {
        folderName: foundKey,
        title: manifest[foundKey]
    }
}