import {useEffect, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";

export type GameData = Record<string, string>;

export function useGameManifest(): GameData | null {
    const [games, setGames] = useState<GameData | null>(null);
    useEffect(() => {
        loadJson<GameData>("/manifest.json")
            .then((data) => {

                const sorted = Object.fromEntries(
                    Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
                );

                setGames(sorted);
            })
            .catch((e: Error) => {
                console.error("MANIFEST LOAD ERROR:", e);
                setGames({});
            });
    }, []);

    return games;
}