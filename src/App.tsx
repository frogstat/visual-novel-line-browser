import './App.css'
import GameView from "./GameView.tsx";
import {useState} from "react";
import {useGameManifest} from "./hooks/useGameManifest.ts"

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
                <p key={currentGame} onClick={() => setGame(currentGame)}>{currentGame}</p>
            );
        }
    }

    if (game) {
        return (
            <GameView
                game={game}
                unselectGame={unselectGame}
            />
        )
    } else {
        return (
            <main className="app">
                <div className="container">
                    <h1>Line Browser</h1>
                    {resolveGameSelectorScreen()}
                </div>
            </main>
        );
    }

}

export default App
