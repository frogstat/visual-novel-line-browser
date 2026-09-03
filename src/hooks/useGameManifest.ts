import {useEffect, useState} from "react";

export function useGameManifest(): string[] | null {
    const [games, setGames] = useState<string[] | null>(null);
    useEffect(() => {
        loadManifest()
            .then(setGames)
            .catch(console.error);
    }, []);

    return games;
}


async function loadManifest():Promise<string[]> {
    const response = await fetch("/manifest.json");
    if (!response.ok) {
        throw new Error("Failed to load manifest.json");
    }

    const data = await response.json();
    return data.games ?? []
}