import type {Line, VoiceFilter} from "./types.ts";
import {getFileWithoutExtension} from "./generalUtils.ts";
import {getLineValue} from "./lineParser.ts";


export function createListOfMatches(
    lines: Line[],
    query: string,
    languages: string[],
    selectedCharacter: string | null,
    favorites: number[],
    favoritesOnly: boolean,
    voiceFilter: VoiceFilter): number[] {


    const q = query.toLowerCase();
    const matches: number[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (favoritesOnly && !favorites.includes(i)) {
            continue;
        }

        if (
            (voiceFilter == "voiced" && !line.voice_file) ||
            (voiceFilter == "unvoiced" && line.voice_file)) {
            continue;
        }

        if (selectedCharacter && !lineMatchesSelectedCharacter(selectedCharacter, lines[i], languages)) {
            continue;
        }

        if (!lineMatchesQuery(line, q, languages)) {
            continue;
        }

        matches.push(i)
    }

    return matches;

}

function lineMatchesSelectedCharacter(selectedCharacter: string, line: Line, languages: string[]): boolean {
    for (const language of languages) {
        const speaker = getLineValue(line, "speaker", language);
        if (speaker === selectedCharacter) {
            return true;
        }
    }
    return false;
}

function lineMatchesQuery(line: Line, query: string, languages: string[]): boolean {

    // Lack of search query means that everything matches.
    if (!query) {
        return true;
    }

    // Direct matches for voice lines should always show.
    const voiceFile = line.voice_file?.toLowerCase()
    if (voiceFile && getFileWithoutExtension(voiceFile) === query) {
        return true;
    }

    // Allow the user to search in all languages regardless of current language.
    // Mainly to prevent search results from changing when swapping languages, but is also convenient.
    for (const language of languages) {
        const text = getLineValue(line, "text", language);

        if (!text) {
            continue;
        }

        if (text.toLowerCase().includes(query)) {
            return true;
        }
    }

    return false;
}

