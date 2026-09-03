import Header from "./components/Header.tsx";
import ResultList from "./components/ResultList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {useGameView} from "./hooks/useGameView.ts";
import {useGameData} from "./hooks/useGameData.ts";
import {useMemo} from "react";
import {getFilteredList} from "./utils/search.ts";

type GameViewProps = {
    game: string;
    unselectGame: () => void
};

function GameView({game, unselectGame}: GameViewProps) {

    const {
        lines
    } = useGameData(game);

    const {
        searchText,
        setSearchText
    } = useGameView();



    const results = useMemo(() => {
        if (!lines) {
            return null;
        }
        return getFilteredList(lines, searchText);
    }, [lines, searchText]);

    return (
        <>
            <h1 onClick={unselectGame}>Return</h1>
            <Header
                gameName={game}
            />

            <SearchBar
                setSearchText={setSearchText}
            />

            <ResultList
                results={results}
            />
        </>
    )
}

export default GameView;