import {useEffect, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";

export function useGameManifest(): string[] | null {
    const [games, setGames] = useState<string[] | null>(null);
    useEffect(() => {
        loadJson("/manifest.json")
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