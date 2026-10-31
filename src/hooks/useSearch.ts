import {type ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import type {Characters, Line, SelectedCharacter, VoiceFilter} from "../utils/types.ts";
import {createListOfMatches} from "../utils/search.ts";
import {useSearchParams} from 'react-router-dom';


export function useSearch(gameFolder: string, languages: string[], lines: Line[] | null, codeLength: number | null, characters: Characters | null) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<string>(searchParams.get("q") ?? "");

    // Toggles
    const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);
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
        const id = option.value;

        if (!id || !characters) {
            setSelectedCharacter(null);
            return;
        }

        const name = languages.length > 0 && languages[0] ?
            characters[id][`name_${languages[0]}`] :
            characters[id].name;

        setSelectedCharacter({
            id: id,
            name: name ?? "",
        })
    }


    // SEARCH
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
            setSearchParams(prev => {
                if (query) {
                    prev.set("q", query);
                } else {
                    prev.delete("q");
                }
                return prev;
            }, {replace: true});
        }, 200);
        return () => clearTimeout(timer);
    }, [query]);


    const resultIndices: number[] | null = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(
            lines,
            debouncedQuery,
            languages,
            selectedCharacter,
            favorites,
            favoritesOnly,
            voiceFilter,
            codeLength);
    }, [lines, debouncedQuery, languages, selectedCharacter, favoritesOnly, voiceFilter]);

    return {
        voiceFilter,
        setVoiceFilter,
        favorites,
        toggleFavorite,
        favoritesOnly,
        toggleFavoritesOnly,
        query,
        setQuery,
        selectCharacter,
        resultIndices,
        setSelectedCharacter,
        selectedCharacter,
        topOfPageRef,
    }
}