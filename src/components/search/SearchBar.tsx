import type {Characters} from "../../utils/types.ts";
import CharacterSelect from "./CharacterSelect.tsx";

type SearchBarProps = {
    setQuery: (searchText: string) => void;
    characters: Characters;
    currentLanguage: string;
};

function SearchBar({setQuery, characters, currentLanguage}: SearchBarProps) {

    return (
        <div className="search-bar">
            <input
                className="search-query-bar"
                type="text"
                placeholder="Search quote..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <CharacterSelect characters={characters} currentLanguage={currentLanguage}/>
        </div>
    )

}

export default SearchBar;