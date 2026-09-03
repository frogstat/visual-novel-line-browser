import Header from "./components/Header.tsx";
import ResultList from "./components/ResultList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {useGameView} from "./hooks/useGameView.ts";
import {useGameData} from "./hooks/useGameData.ts";

type GameViewProps = {
    game: string;
    unselectGame: () => void
};

function GameView({game, unselectGame}: GameViewProps) {

    const {
        gameFolder,
        lines,
        voiceBasePath
    } = useGameData(game);

    const {
        searchText,
        setSearchText
    } = useGameView();

    return (
        <>
            <h1 onClick={unselectGame}>Return</h1>
            <Header
                gameName={game}
            />

            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
            />

            <ResultList
                lines={lines}
            />
        </>
    )
}

export default GameView;