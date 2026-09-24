import type {Character, Characters} from "../../utils/types.ts";
import {type ChangeEvent} from "react";
import {getUIName} from "../../utils/uiLocale.ts";

type CharacterSelectProps = {
    characters: Characters,
    selectCharacter: (e: ChangeEvent<HTMLSelectElement>) => void,
    currentLanguage: string,
    selectedCharacter: string | null
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
            <option value={characterName} key={characterCode}>{characterName}</option>
        )
    }

    function handleSelectValue(){
        if(!selectedCharacter){
            return "";
        }

        for (const character of Object.values(characters)){
            const name = currentLanguage ?
                character[`name_${currentLanguage}`]
                : character[`name`];
            if(selectedCharacter == name){
                return name;
            }
        }

        return "miscCharacter";
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
