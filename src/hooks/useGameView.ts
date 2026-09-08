import {type ChangeEvent, useState} from "react";
import type {SelectedCharacter} from "../utils/types.ts";


export function useGameView() {
    const [searchText, setSearchText] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);

    function selectCharacter(e: ChangeEvent<HTMLSelectElement>) {
        const option = e.target.selectedOptions[0];

        const id = option.value;
        const name = option.text;

        if(!id || !name){
            setSelectedCharacter(null);
        } else {
            setSelectedCharacter({ id, name })
        }
    }

    return {
        query: searchText,
        setQuery: setSearchText,
        selectedCharacter,
        selectCharacter
    };
}