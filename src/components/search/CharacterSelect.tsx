import type {Character, Characters} from "../../utils/types.ts";
import {type ChangeEvent} from "react";

type CharacterSelectProps = {
    characters: Characters,
    selectCharacter: (e: ChangeEvent<HTMLSelectElement>) => void,
    currentLanguage: string
}

function CharacterSelect({characters, currentLanguage, selectCharacter}: CharacterSelectProps) {

    function createCharacterOption(characterCode: string, character: Character) {
        const characterName = character[`name_${currentLanguage}`];
        if (!characterName) {
            return;
        }
        return (
            <option value={characterCode} key={characterCode}>{characterName}</option>
        )
    }

    return (
        <select className="character-select-dropdown" onChange={selectCharacter}>
            <option value="">No character</option>
            {Object.entries(characters).map(([characterCode, character]) =>
                createCharacterOption(characterCode, character)
            )}
        </select>
    );

}

export default CharacterSelect;