import type {Character, Characters} from "../../utils/types.ts";

type CharacterSelectProps = {
    characters: Characters,
    currentLanguage: string
}

function CharacterSelect({characters, currentLanguage}: CharacterSelectProps) {


    function createCharacterOption(characterCode: string, character: Character) {
        const characterName = character[`name_${currentLanguage}`];
        if (!characterName) {
            return;
        }
        return (
            <option value={characterName} key={characterCode}>{characterName}</option>
        )
    }

    return (
        <select style={{color:"black", width:"200px"}}>
            {Object.entries(characters).map(([characterCode, character]) =>
                createCharacterOption(characterCode, character)
            )}
        </select>
    );

}

export default CharacterSelect;