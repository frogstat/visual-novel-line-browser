import type {Line, SelectedCharacter, VoiceFilter} from "./types.ts";
import {getFileWithoutExtension} from "./generalUtils.ts";
import {getCharacterCodeFromVoiceLine} from "./lineParser.ts";


export function createListOfMatches(
    lines: Line[],
    query: string,
    languages: string[],
    selectedCharacter: SelectedCharacter | null,
    codeLength: number,
    favorites: number[],
    favoritesOnly: boolean,
    voiceFilter:VoiceFilter): number[] {


    const q = query.trim().toLowerCase();
    const matches: number[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (favoritesOnly && !favorites.includes(i)) {
            continue;
        }

        if(
            (voiceFilter == "voiced only" && !line.voice_file) ||
            (voiceFilter == "unvoiced only" && line.voice_file)) {
            continue;
        }

        if (selectedCharacter && !lineMatchesSelectedCharacter(selectedCharacter, lines[i], codeLength, languages)) {
            continue;
        }

        if (!lineMatchesQuery(line, q, languages)) {
            continue;
        }

        matches.push(i)
    }

    return matches;

}

function lineMatchesSelectedCharacter(selectedCharacter: SelectedCharacter, line: Line, codeLength: number, languages: string[]): boolean {
    //First, I check for a matching characterID
    if (line.voice_file && codeLength) {
        const voiceLineCharacterId = getCharacterCodeFromVoiceLine(line.voice_file, codeLength);
        if (voiceLineCharacterId === selectedCharacter.id) {
            return true;
        }

    }

    for (const language of languages) {
        const speaker = line[`speaker_${language}`]
        if (speaker && selectedCharacter.names.includes(speaker)) {
            return true;
        }
    }
    return false;
}

function lineMatchesQuery(line: Line, query: string, languages: String[]): boolean {

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
        const text = line[`text_${language}`];

        if (!text) {
            continue;
        }

        if (language === "en" ?
            matchEnglishQuery(query, text)
            : text.toLowerCase().includes(query)) {
            return true;
        }
    }

    return false;
}

function matchEnglishQuery(query: string, text: string): boolean {
    const escaped = escapeRegex(query);
    const pattern = new RegExp(`(?<![a-zA-Z0-9'])${escaped}(?![a-zA-Z0-9'])`, "i");
    return pattern.test(text);
}

function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
