import {useEffect, useState} from "react";

export function useFavorites(gameFolder: string) {


    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);


    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem(`${gameFolder}-favorites`) || "[]"))
    }, [gameFolder]);

    useEffect(() => {
        localStorage.setItem(`${gameFolder}-favorites`, JSON.stringify(favorites));
    }, [gameFolder, favorites]);

    // lineIndex is the index of the line in the lines list
    function toggleFavorite(lineIndex: number): void {
        setFavorites(prev => {
            return prev.includes(lineIndex)
                ? prev.filter(item => item !== lineIndex)
                : [...prev, lineIndex];
        })
    }

    function toggleFavoritesOnly(): void {
        setFavoritesOnly(!favoritesOnly);
    }

    return {
        favorites,
        toggleFavorite,
        favoritesOnly,
        toggleFavoritesOnly
    }

}