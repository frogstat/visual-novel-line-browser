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
                <div className="voice-filter">
                    <button className={voiceFilter === "voiced" ? "button-active" : ""}
                            onClick={() => setVoiceFilter("voiced")}>Voiced Only
                    </button>
                    <button className={voiceFilter === "unvoiced" ? "button-active" : ""}
                            onClick={() => setVoiceFilter("unvoiced")}>Unvoiced Only
                    </button>
                    <button className={voiceFilter === "any" ? "button-active" : ""}
                            onClick={() => setVoiceFilter("any")}>Any
                    </button>
                </div>
                <button className={favoritesOnly ? "button-active" : ""} onClick={toggleFavoritesOnly}>Favorites Only</button>
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