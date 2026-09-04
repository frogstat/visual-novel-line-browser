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
        codeLength,
        languages,
        currentLanguage,
        setCurrentLanguage
    } = useGameData(game);

    //const cycleLanguage = useCycleLanguage(currentLanguage, setCurrentLanguage, languages)

    const {
        query,
        setQuery
    } = useGameView();

    const playVoice = useAudioPlayer(voiceBasePath);


    const results = useMemo(() => {
        if (!lines) {
            return null;
        }
        return createListOfMatches(lines, query, characters, codeLength, currentLanguage, languages);
    }, [lines, query, characters, codeLength, currentLanguage, languages]);

    return (
        <>
            <Header
                returnToGameMenu={unselectGame}
                gameName={game}
                languages={languages}
                setCurrentLanguage={setCurrentLanguage}
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