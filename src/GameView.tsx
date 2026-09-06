import Header from "./components/Header.tsx";
import ResultList from "./components/search/ResultList.tsx";
import SearchBar from "./components/search/SearchBar.tsx";
import {useGameView} from "./hooks/useGameView.ts";
import {useGameData} from "./hooks/useGameData.ts";
import {useMemo} from "react";
import {createListOfMatches} from "./utils/search.ts";
import {useAudioPlayer} from "./hooks/useAudioPlayer.ts";
import {useMusicPlayer} from "./hooks/useMusicPlayer.ts";


type GameViewProps = {
    game: string;
    unselectGame: () => void
};

function GameView({game, unselectGame}: GameViewProps) {

    const {
        lines,
        voiceBasePath,
        musicBasePath,
        //characters,
        languages,
        currentLanguage,
        setCurrentLanguage
    } = useGameData(game);

    const {
        query,
        setQuery
    } = useGameView();

    const playVoice = useAudioPlayer(voiceBasePath);

    const {
        tracks,
        currentTrack,
        volume,
        setVolume,
        isPlaying,
        togglePause,
        playNextTrack
    } = useMusicPlayer(musicBasePath);


    const resultIndices: number[] | null = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(lines, query, languages);
    }, [lines, query, languages]);

    return (

        <div className="game-box">
            <Header
                returnToGameMenu={unselectGame}
                gameName={game}
                languages={languages}
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                tracks={tracks}
                musicProps={{
                    currentTrack,
                    volume,
                    setVolume,
                    isPlaying,
                    togglePause,
                    playNextTrack
                }}
            />

            <SearchBar
                setQuery={setQuery}
            />

            <ResultList
                resultIndices={resultIndices}
                lines={lines}
                currentLanguage={currentLanguage}
                playVoice={playVoice}
            />
        </div>
    )
}

export default GameView;