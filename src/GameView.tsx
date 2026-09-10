import Header from "./components/Header.tsx";
import ResultList from "./components/search/ResultList.tsx";
import SearchTools from "./components/search/SearchTools.tsx";
import ContextPanel from "./components/search/ContextPanel.tsx";
import {useGameView} from "./hooks/useGameView.ts";
import {useGameData} from "./hooks/useGameData.ts";
import {useMemo} from "react";
import {createListOfMatches} from "./utils/search.ts";
import {useAudioPlayer} from "./hooks/useAudioPlayer.ts";
import {useMusicPlayer} from "./hooks/useMusicPlayer.ts";
import {useContextView} from "./hooks/useContextView.ts";
import type {Game} from "./utils/types.ts";
import {useFavorites} from "./hooks/useFavorites.ts";
import {useSearch} from "./hooks/useSearch.ts";


type GameViewProps = {
    game: Game;
    unselectGame: () => void
};

function GameView({game, unselectGame}: GameViewProps) {

    const {
        lines,
        voiceBasePath,
        musicBasePath,
        characters,
        languages,
        currentLanguage,
        setCurrentLanguage,
        error,
        codeLength,
    } = useGameData(game.folderName);

    const {
        query,
        setQuery,
        selectedCharacter,
        selectCharacter
    } = useGameView(characters ?? {}, languages);

    const playVoice = useAudioPlayer(voiceBasePath);

    const {
        tracks,
        currentTrack,
        volume,
        changeVolume,
        isPlaying,
        togglePause,
        playNextTrack
    } = useMusicPlayer(musicBasePath);

    const {
        contextView,
        showContextView,
        closeContext,
        navigateContextView,
        originLineRef,
        contextMenuRef
    } = useContextView(lines?.length ?? 0);

    const {
        favorites,
        favoritesOnly,
        toggleFavorite,
        toggleFavoritesOnly,
    } = useFavorites(game.folderName);

    const {
        voiceFilter,
        setVoiceFilter
    } = useSearch();

    const resultIndices: number[] | null = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(
            lines,
            query,
            languages,
            selectedCharacter,
            codeLength,
            favorites,
            favoritesOnly,
            voiceFilter);
    }, [lines, query, languages, selectedCharacter, codeLength, favoritesOnly, voiceFilter]);

    return (
        <main className="app">
            <div className="game-box">
                <Header
                    returnToGameMenu={unselectGame}
                    gameName={game.title}
                    languages={languages}
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={setCurrentLanguage}
                    tracks={tracks}
                    musicProps={{
                        currentTrack,
                        volume,
                        changeVolume,
                        isPlaying,
                        togglePause,
                        playNextTrack
                    }}
                />

                <SearchTools
                    setQuery={setQuery}
                    characters={characters ?? {}}
                    selectCharacter={selectCharacter}
                    currentLanguage={currentLanguage}
                    favoritesOnly={favoritesOnly}
                    toggleFavoritesOnly={toggleFavoritesOnly}
                    voiceFilter={voiceFilter}
                    setVoiceFilter={setVoiceFilter}
                />

                <ResultList
                    resultIndices={resultIndices}
                    lines={lines}
                    currentLanguage={currentLanguage}
                    playVoice={playVoice}
                    error={error}
                    showContextView={showContextView}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            </div>

            {contextView && (
                <ContextPanel
                    lines={lines ?? []}
                    contextView={contextView}
                    closeContext={closeContext}
                    navigateContextView={navigateContextView}
                    languages={languages}
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={setCurrentLanguage}
                    playVoice={playVoice}
                    originLineRef={originLineRef}
                    contextMenuRef={contextMenuRef}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            )}
        </main>
    )
}

export default GameView;