import Header from "./components/Header.tsx";
import ResultList from "./components/ResultList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {useGameView} from "./hooks/useGameView.ts";

const gameName = "Little Busters"

function GameView(){

    const {
        searchText,
        setSearchText
    } = useGameView();


    return(
        <>
            <Header
                gameName={gameName}
            />

            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
            />

            <ResultList/>
        </>
    )
}

export default GameView;