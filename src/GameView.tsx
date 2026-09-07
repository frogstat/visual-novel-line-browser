import Header from "./components/Header.tsx";
import ResultList from "./components/search/ResultList.tsx";
import SearchBar from "./components/search/SearchBar.tsx";
import ContextPanel from "./components/search/ContextPanel.tsx";
import {useGameView} from "./hooks/useGameView.ts";
import {useGameData} from "./hooks/useGameData.ts";
import {useMemo} from "react";
import {createListOfMatches} from "./utils/search.ts";
import {useAudioPlayer} from "./hooks/useAudioPlayer.ts";
import {useMusicPlayer} from "./hooks/useMusicPlayer.ts";
import {useContextView} from "./hooks/useContextView.ts";
import type {Game} from "./utils/types.ts";





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
        error
    } = useGameData(game.folderName);

    const {
        query,
        setQuery
    } = useGameView();

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


    const resultIndices: number[] | null = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(lines, query, languages);
    }, [lines, query, languages]);

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

                <SearchBar
                    setQuery={setQuery}
                    characters={characters ?? {}}
                    currentLanguage={currentLanguage}
                />

                <ResultList
                    resultIndices={resultIndices}
                    lines={lines}
                    currentLanguage={currentLanguage}
                    playVoice={playVoice}
                    error={error}
                    showContextView={showContextView}
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
                />
            )}
        </main>
    )
}

export default GameView;