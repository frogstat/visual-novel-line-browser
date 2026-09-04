import type {Line} from "./Line.ts";
import {resolveCharacterNameFromCode} from "./lineParser.ts";

export type Match = {
    index: number;
    speaker: string | undefined;
    text: string | undefined;
    voiceFile: string | undefined;
}

export function createListOfMatches(lines: Line[], query: string, characters: any, codeLength: number): Match[] {

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
            speaker: resolveCharacterNameFromCode(lines[i].voice_file, characters, codeLength) ?? lines[i].speaker_ja,
            text: lines[i].text_ja,
            voiceFile: lines[i].voice_file
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
