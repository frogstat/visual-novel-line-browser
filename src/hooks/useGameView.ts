import {useState} from "react";

export function useGameView() {
    const [searchText, setSearchText] = useState('');

    return {
        query: searchText,
        setQuery: setSearchText
    };
}