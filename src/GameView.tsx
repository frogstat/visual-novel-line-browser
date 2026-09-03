import Header from "./components/Header.tsx";
import ResultList from "./components/ResultList.tsx";
import SearchBar from "./components/SearchBar.tsx";

function GameView(){



    return(
        <>
            <Header/>
            <SearchBar/>
            <ResultList/>
        </>
    )
}

export default GameView;