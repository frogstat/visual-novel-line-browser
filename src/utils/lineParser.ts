import type {Line} from "./types.ts";


/**
 *
 * @param line - The line in question
 * @param language - A 2 letter language code such as jp, en, se, ch
 */
export function resolveTextFromLanguage(line: Line, language: string): string | null | undefined {
    return line[`text_${language}`];
}


/**
 * Returns a character name from the value of a voice file. Returns null if nothing is required data doesn't exist.
 * @param voiceFile - The voice file for the line (e.g. HAY45666.ogg where HAY stands for Hayato)
 * @param characters - A list of character codes and their matching character names.
 * @param codeLength - How many chars in the voice file name are the code. (e.g. MAK_COMMON_033.ogg will have a code length of 3)
 */
function resolveCharacterNameFromCode(voiceFile: string | undefined | null, characters: any, codeLength: number, language: string) {

    if (!voiceFile || !codeLength) {
        return null;
    }

    const characterCode: string = voiceFile.slice(0, codeLength);
    if (characterCode in characters) {
        return characters[characterCode]?.[`name_${language}`];
    }

    return null;
}

function resolveSpeakerFromLine(line: Line, language: string): string | null | undefined {
    return line[`speaker_${language}`];
}

export function resolveSpeaker(voiceFile: string | undefined | null, characters: any, codeLength: number, language: string, line: Line) {
    if (!voiceFile || !codeLength) {
        return resolveSpeakerFromLine(line, language);
    }

    return resolveCharacterNameFromCode(voiceFile, characters, codeLength, language)
        ?? resolveSpeakerFromLine(line, language);
}

