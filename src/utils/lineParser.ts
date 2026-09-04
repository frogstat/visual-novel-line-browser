/**
 * Returns a character name from the value of a voice file. Returns null if nothing is required data doesn't exist.
 * @param voiceFile - The voice file for the line (e.g. HAY45666.ogg where HAY stands for Hayato)
 * @param characters - A list of character codes and their matching character names.
 * @param codeLength - How many chars in the voice file name are the code. (e.g. MAK_COMMON_033.ogg will have a code length of 3)
 */

export function resolveCharacterNameFromCode(voiceFile: string | undefined, characters:any, codeLength: number) {
    if (!voiceFile || !codeLength) {
        return null;
    }

    const characterCode : string = voiceFile.slice(0, codeLength);

    if (characterCode in characters) {
        //TODO: Allow this to be language agnostic
        return characters[characterCode].name_ja;
    }

    return null;
}


