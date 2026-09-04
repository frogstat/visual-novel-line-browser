import type {Line, Match} from "./types.ts";
import {
    resolveSpeaker,
    resolveTextFromLanguage
} from "./lineParser.ts";



export function createListOfMatches(lines: Line[], query: string, characters: any, codeLength: number, language:string): Match[] {

    const q = query.trim().toLowerCase();

    const matches = [];

    for (let i = 0; i < lines.length; i++) {

        //TODO: Add more match conditions like character matching, voice file matching.


        if (!lineMatchesQuery(lines[i], q)) {
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
    return matches.slice(0, 100);

}


function lineMatchesQuery(line: Line, query: string): boolean {
    // Lack of search query means that everything matches.
    if (!query) {
        return true;
    }

    if (line.speaker_ja?.toLowerCase().includes(query) ||
        line.text_ja?.toLowerCase().includes(query)) {
        return true;
    }
    return false;
}
