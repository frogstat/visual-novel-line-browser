import Header from "./components/Header.tsx";
import ResultList from "./components/ResultList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {useGameView} from "./hooks/useGameView.ts";
import {useGameData} from "./hooks/useGameData.ts";
import {useMemo} from "react";
import {createListOfMatches} from "./utils/search.ts";
import {useAudioPlayer} from "./hooks/useAudioPlayer.ts";

type GameViewProps = {
    game: string;
    unselectGame: () => void
};

function GameView({game, unselectGame}: GameViewProps) {

    const {
        lines,
        voiceBasePath,
        characters,
        codeLength
    } = useGameData(game);

    const {
        query,
        setQuery
    } = useGameView();

    const playVoice = useAudioPlayer(voiceBasePath);



    const results = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(lines, query, characters, codeLength);
    }, [lines, query, characters, codeLength]);

    return (
        <>
            <h1 onClick={unselectGame}>Return</h1>
            <Header
                gameName={game}
            />

            <SearchBar
                setQuery={setQuery}
            />

            <ResultList
                results={results}
                playVoice={playVoice}
            />


        </>
    )
}

export default GameView;