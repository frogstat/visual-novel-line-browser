import {useEffect, useState} from "react";

export function useGameManifest(): string[] {
    const [games, setGames] = useState<string[]>([]);
    useEffect(() => {
        loadManifest().then(setGames);
    }, []);

    return games;
}


async function loadManifest() {
    const response = await fetch("/manifest.json");
    if (!response.ok) {
        throw new Error("Failed to load manifest.json");
    }

    const data = await response.json();
    return data.games ?? []
}