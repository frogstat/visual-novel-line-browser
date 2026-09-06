import type {Languages, Line, Match} from "./types.ts";
import {
    resolveSpeaker,
    resolveTextFromLanguage
} from "./lineParser.ts";
import {getFileWithoutExtension} from "./generalUtils.ts";


export function createListOfMatches(lines: Line[], query: string, characters: any, codeLength: number, language: string, languages: Languages): Match[] {

    const q = query.trim().toLowerCase();
    const matches = [];

    for (let i = 0; i < lines.length; i++) {

        //TODO: Add more match conditions like character matching, voice file matching.


        if (!lineMatchesQuery(lines[i], q, languages)) {
            continue;
        }


        // TODO: eventually resolve speaker and text through the selected language.
        // TODO: Match character name by resolving it through character code.
        // Creating a separate match type from line might be needed because language is dynamic.
        // It's not guaranteed that speaker_en exists, and it should be possible to add speaker_ch if so desired.


        matches.push({
            index: i,
            speaker: resolveSpeaker(lines[i].voice_file, characters, codeLength, language, lines[i]) ?? null,
            text: resolveTextFromLanguage(lines[i], language) ?? null,
            voiceFile: lines[i].voice_file ?? null,
        })

    }

    // TODO: Include all matches for paging, and slice somewhere else
    return matches;

}


function lineMatchesQuery(line: Line, query: string, languages: Languages): boolean {

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
