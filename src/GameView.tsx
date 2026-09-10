import Header from "./components/Header.tsx";
import ResultList from "./components/search/ResultList.tsx";
import SearchTools from "./components/search/SearchTools.tsx";
import ContextPanel from "./components/search/ContextPanel.tsx";
import {useGameData} from "./hooks/useGameData.ts";
import {useAudioPlayer} from "./hooks/useAudioPlayer.ts";
import {useMusicPlayer} from "./hooks/useMusicPlayer.ts";
import {useContextView} from "./hooks/useContextView.ts";
import type {Game} from "./utils/types.ts";
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
        voiceFilter,
        setVoiceFilter,
        favorites,
        toggleFavorite,
        favoritesOnly,
        toggleFavoritesOnly,
        setQuery,
        selectCharacter,
        resultIndices
    } = useSearch(game.folderName, characters ?? {}, languages, codeLength, lines);


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
                    voiceBasePath={voiceBasePath}
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
                    voiceBasePath={voiceBasePath}
                />
            )}
        </main>
    )
}

export default GameView;