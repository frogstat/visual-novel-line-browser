import {useEffect, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";

type GameData = {
    "games": [string];
}

export function useGameManifest(): string[] | null {
    const [games, setGames] = useState<string[] | null>(null);
    useEffect(() => {
        loadJson<GameData>("/manifest.json")
            .then((data) => {
                setGames(data.games ?? []);
            })
            .catch((e:Error) => {
                console.error("MANIFEST LOAD ERROR:", e);
                setGames([]);
            });
    }, []);

    return games;
}