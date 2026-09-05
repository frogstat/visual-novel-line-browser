import './App.css'
import GameView from "./GameView.tsx";
import {useState} from "react";
import {useGameManifest} from "./hooks/useGameManifest.ts"
import GameCard from "./components/GameCard.tsx";

function App() {
    const [game, setGame] = useState<string | null>(null)
    const games: string[] | null = useGameManifest()

    function unselectGame() {
        setGame(null);
    }

    function resolveGameSelectorScreen() {
        if (games === null) {
            return <p>Loading...</p>
        } else if (games.length === 0) {
            return <p>No games found</p>
        } else {
            return games.map(currentGame =>
                //
                <GameCard selectGame={() => setGame(currentGame)} key={currentGame} game={currentGame}/>
            );
        }
    }

    if (game) {
        return (
            <main className="app">
                <GameView
                    game={game}
                    unselectGame={unselectGame}
                />
            </main>
        )
    } else {
        return (
            <main className="app">
                <h1 style={{textAlign:"center"}}>Line Browser</h1>
                <div className="game-selector-container">
                    {resolveGameSelectorScreen()}
                </div>
            </main>
        );
    }

}

export default App
