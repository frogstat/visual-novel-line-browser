import type {Characters, VoiceFilter} from "../../utils/types.ts";
import CharacterSelect from "./CharacterSelect.tsx";
import type {ChangeEvent} from "react";

type SearchBarProps = {
    setQuery: (searchText: string) => void;
    characters: Characters;
    selectCharacter: (e: ChangeEvent<HTMLSelectElement>) => void;
    currentLanguage: string;
    favoritesOnly: boolean;
    toggleFavoritesOnly: () => void;
    voiceFilter: VoiceFilter;
    setVoiceFilter: (filter: VoiceFilter) => void;
};

const enabled = {
    backgroundColor: "green",
    color: "white",
}

const disabled = {
    backgroundColor: "red",
    color: "white",
}


function SearchTools({
                         setQuery,
                         characters,
                         selectCharacter,
                         currentLanguage,
                         favoritesOnly,
                         toggleFavoritesOnly,
                         voiceFilter,
                         setVoiceFilter
                     }: SearchBarProps) {

    return (
        <div className="search-tools">
            <div className="search-tools-top">
                <button style={favoritesOnly ? enabled : disabled} onClick={toggleFavoritesOnly}>Favorites Only</button>
                <button style={voiceFilter === "voiced only" ? enabled : disabled}
                        onClick={() => setVoiceFilter("voiced only")}>Voiced Only
                </button>
                <button style={voiceFilter === "unvoiced only" ? enabled : disabled}
                        onClick={() => setVoiceFilter("unvoiced only")}>Unvoiced Only
                </button>
                <button style={voiceFilter === "any" ? enabled : disabled}
                        onClick={() => setVoiceFilter("any")}>Any
                </button>
            </div>

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
        </div>
    )

}

export default SearchTools;