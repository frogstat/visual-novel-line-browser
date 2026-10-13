import type {Line, SelectedCharacter, VoiceFilter} from "./types.ts";
import {getFileWithoutExtension} from "./generalUtils.ts";
import {getLineValue} from "./lineParser.ts";


export function createListOfMatches(
    lines: Line[],
    query: string,
    languages: string[],
    selectedCharacter: SelectedCharacter | null,
    favorites: number[],
    favoritesOnly: boolean,
    voiceFilter: VoiceFilter,
    codeLength: number | null): number[] {


    const q = query.toLowerCase();
    const qRegex = createQueryRegex(q);

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

        if (selectedCharacter && !lineMatchesSelectedCharacter(selectedCharacter, lines[i], languages, codeLength)) {
            continue;
        }

        if (!lineMatchesQuery(line, q, qRegex, languages)) {
            continue;
        }

        matches.push(i)
    }

    return matches;

}

function lineMatchesSelectedCharacter(selectedCharacter: SelectedCharacter, line: Line, languages: string[], codeLength: number | null): boolean {
    if(codeLength && line.voice_file && selectedCharacter.id !== null) {
        if(line.voice_file.substring(0,codeLength) == selectedCharacter.id){
            return true;
        }
    }

    for (const language of languages) {
        const speaker = getLineValue(line, "speaker", language);
        if (speaker === selectedCharacter.name) {
            return true;
        }
    }
    return false;
}

function lineMatchesQuery(line: Line, query: string, queryRegex: RegExp, languages: string[]): boolean {

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
        const speaker = getLineValue(line, "speaker", language);

        if (speaker && speaker.toLowerCase().startsWith(query)) {
            return true;
        }

        if (language === "en" && lineMatchesEnglishQuery(queryRegex, text)) {
            return true;
        } else if (language !== "en" && text.toLowerCase().includes(query)) {
            return true;
        }

    }

    return false;
}

function lineMatchesEnglishQuery(queryRegex: RegExp, text: string): boolean {
    return queryRegex.test(text.replace("\"", ""));
}

function createQueryRegex(query: string) {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escapedQuery}`, 'i');
}
