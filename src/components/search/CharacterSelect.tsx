import type {Character, Characters, SelectedCharacter} from "../../utils/types.ts";
import {type ChangeEvent} from "react";
import {getUIName} from "../../utils/uiLocale.ts";

type CharacterSelectProps = {
    characters: Characters | [],
    selectCharacter: (e: ChangeEvent<HTMLSelectElement>) => void,
    currentLanguage: string,
    selectedCharacter: SelectedCharacter | null
}

function CharacterSelect({characters, currentLanguage, selectCharacter, selectedCharacter}: CharacterSelectProps) {

    function createCharacterOption(characterCode: string, character: Character) {
        const characterName = currentLanguage ?
            character[`name_${currentLanguage}`]
            : character[`name`];

        if (!characterName) {
            return <></>;
        }
        return (
            <option value={characterCode} key={characterCode}>{characterName}</option>
        )
    }

    function handleSelectValue(){
        if(!selectedCharacter){
            return "";
        }

        if(!selectedCharacter.id){
            return "miscCharacter";
        } else {
            return selectedCharacter.id;
        }
    }

    return (
        <select className="character-select-dropdown" onChange={selectCharacter} value={handleSelectValue()}>
            <option value="">{getUIName(currentLanguage, "noCharacters")}</option>
            {Object.entries(characters).map(([characterCode, character]) =>
                createCharacterOption(characterCode, character)
            )}
            {handleSelectValue() === "miscCharacter" && (
                <option value="miscCharacter">
                    {getUIName(currentLanguage, "miscCharacter")}
                </option>
            )}
        </select>
    );

}

export default CharacterSelect;
