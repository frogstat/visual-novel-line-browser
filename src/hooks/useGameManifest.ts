import {useEffect, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";

export type GameData = Record<string, string>;

export function useGameManifest(): GameData | null {
    const [games, setGames] = useState<GameData | null>(null);
    useEffect(() => {
        loadJson<GameData>("/manifest.json")
            .then((data) => {
                setGames(data);
            })
            .catch((e:Error) => {
                console.error("MANIFEST LOAD ERROR:", e);
                setGames({});
            });
    }, []);

    return games;
}