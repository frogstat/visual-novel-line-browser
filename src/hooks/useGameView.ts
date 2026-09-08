import {type ChangeEvent, useState} from "react";
import type {Character, Characters, SelectedCharacter} from "../utils/types.ts";


export function useGameView(characters: Characters, languages: string[]) {
    const [searchText, setSearchText] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);

    function selectCharacter(e: ChangeEvent<HTMLSelectElement>): void {
        const option = e.target.selectedOptions[0];
        const id = option.value;

        if (!id) {
            setSelectedCharacter(null);
            return;
        }


        const character: Character = characters[id];
        const names: string[] = [];

        for (const language of languages) {
            const name = character?.[`name_${language}`];

            if (name) {
                names.push(name);
            }
        }

        if (!names.length) {
            setSelectedCharacter(null);
        } else {
            setSelectedCharacter({id, names})
        }
    }

    return {
        query: searchText,
        setQuery: setSearchText,
        selectedCharacter,
        selectCharacter
    };
}