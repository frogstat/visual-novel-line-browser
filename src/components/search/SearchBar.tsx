import type {Characters} from "../../utils/types.ts";
import CharacterSelect from "./CharacterSelect.tsx";
import type {ChangeEvent} from "react";

type SearchBarProps = {
    setQuery: (searchText: string) => void;
    characters: Characters;
    selectCharacter: (e: ChangeEvent<HTMLSelectElement>) => void;
    currentLanguage: string;
};

function SearchBar({setQuery, characters, selectCharacter, currentLanguage}: SearchBarProps) {

    return (
        <div className="search-bar">
            <input
                className="search-query-bar"
                type="text"
                placeholder="Search quote..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <CharacterSelect
                characters={characters}
                currentLanguage={currentLanguage}
                selectCharacter={selectCharacter}
            />
        </div>
    )

}

export default SearchBar;