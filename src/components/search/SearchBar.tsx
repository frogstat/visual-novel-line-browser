import type {Characters} from "../../utils/types.ts";
import CharacterSelect from "./CharacterSelect.tsx";
import type {ChangeEvent} from "react";

type SearchBarProps = {
    setQuery: (searchText: string) => void;
    characters: Characters;
    selectCharacter: (e: ChangeEvent<HTMLSelectElement>) => void;
    currentLanguage: string;
    favoritesOnly: boolean;
    toggleFavoritesOnly: () => void;
};

const enabled = {
    backgroundColor: "green",
    color: "white",
}

const disabled = {
    backgroundColor: "red",
    color: "white",
}


function SearchBar({setQuery, characters, selectCharacter, currentLanguage, favoritesOnly, toggleFavoritesOnly}: SearchBarProps) {

    return (
        <div className="search-bar">
            <input
                className="search-query-bar"
                type="text"
                placeholder="Search quote..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <button style={favoritesOnly ? enabled : disabled} onClick={toggleFavoritesOnly}>Favorites Only</button>
            <CharacterSelect
                characters={characters}
                currentLanguage={currentLanguage}
                selectCharacter={selectCharacter}
            />
        </div>
    )

}

export default SearchBar;