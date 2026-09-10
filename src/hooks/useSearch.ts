import {type ChangeEvent, useEffect, useMemo, useState} from "react";
import type {Character, Characters, Line, SelectedCharacter, VoiceFilter} from "../utils/types.ts";
import {createListOfMatches} from "../utils/search.ts";


export function useSearch(gameFolder: string, characters: Characters, languages: string[], codeLength: number, lines: Line[] | null) {
    const [query, setQuery] = useState('');

    // Toggles
    const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);
    const [voiceFilter, setVoiceFilter] = useState<VoiceFilter>("any");
    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);

    // FAVORITE-RELATED FUNCTIONS

    useEffect(() => {
        const fetchedFavorites: number[] = JSON.parse(localStorage.getItem(`${gameFolder}-favorites`) || "[]");

        console.log("Found " + fetchedFavorites.length + " favorited line(s).");
        setFavorites(fetchedFavorites)
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

    //CHARACTER-RELATED FUNCTIONS

    function selectCharacter(e: ChangeEvent<HTMLSelectElement>): void {
        const option = e.target.selectedOptions[0];
        const id = option.value;

        if (!id) {
            setSelectedCharacter(null);
            return;
        }


        const character: Character = characters[id];
        const names: string[] = [];

        for (const language of languages) {
            const name = character?.[`name_${language}`];

            if (name) {
                names.push(name);
            }
        }

        if (!names.length) {
            setSelectedCharacter(null);
        } else {
            setSelectedCharacter({id, names})
        }
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
            codeLength,
            favorites,
            favoritesOnly,
            voiceFilter);
    }, [lines, query, languages, selectedCharacter, codeLength, favoritesOnly, voiceFilter]);

    return {
        voiceFilter,
        setVoiceFilter,
        favorites,
        toggleFavorite,
        favoritesOnly,
        toggleFavoritesOnly,
        setQuery,
        selectCharacter,
        resultIndices
    }
}