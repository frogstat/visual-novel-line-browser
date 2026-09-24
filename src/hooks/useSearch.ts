import {type ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import type {Line, VoiceFilter} from "../utils/types.ts";
import {createListOfMatches} from "../utils/search.ts";


export function useSearch(gameFolder: string, languages: string[], lines: Line[] | null) {
    const [query, setQuery] = useState('');

    // Toggles
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
    const [voiceFilter, setVoiceFilter] = useState<VoiceFilter>("any");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);

    const topOfPageRef = useRef<any>(null);

    // FAVORITE-RELATED FUNCTIONS

    useEffect(() => {
        const fetchedFavorites: number[] = JSON.parse(localStorage.getItem(`${gameFolder}-favorites`) || "[]");

        console.log("Found " + fetchedFavorites.length + " favorited line(s).");
        setFavorites(fetchedFavorites)
    }, [gameFolder]);

    useEffect(() => {
        localStorage.setItem(`${gameFolder}-favorites`, JSON.stringify(favorites));
    }, [gameFolder, favorites]);



    // when clicking a character, it should scroll up
    useEffect(() => {
        topOfPageRef.current?.scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    }, [selectedCharacter]);

    function toggleFavoritesOnly(): void {
        setFavoritesOnly(!favoritesOnly);
    }

    // lineIndex is the index of the line in the lines list
    function toggleFavorite(lineIndex: number): void {
        setFavorites(prev => {
            return prev.includes(lineIndex)
                ? prev.filter(item => item !== lineIndex)
                : [...prev, lineIndex];
        })
    }
    //CHARACTER-RELATED FUNCTIONS

    function selectCharacter(e: ChangeEvent<HTMLSelectElement>): void {
        const option = e.target.selectedOptions[0];
        const name = option.value;

        if (!name) {
            setSelectedCharacter(null);
            return;
        }
        setSelectedCharacter(name)
    }

    // SEARCH

    const resultIndices: number[] | null = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(
            lines,
            query,
            languages,
            selectedCharacter,
            favorites,
            favoritesOnly,
            voiceFilter);
    }, [lines, query, languages, selectedCharacter, favoritesOnly, voiceFilter]);

    return {
        voiceFilter,
        setVoiceFilter,
        favorites,
        toggleFavorite,
        favoritesOnly,
        toggleFavoritesOnly,
        setQuery,
        selectCharacter,
        resultIndices,
        setSelectedCharacter,
        selectedCharacter,
        topOfPageRef
    }
}