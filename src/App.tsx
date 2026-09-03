import './App.css'
import GameView from "./GameView.tsx";
import {useState} from "react";
import {useGameManifest} from "./hooks/useGameManifest.ts"

function App() {
    const [game, setGame] = useState<string | null>(null)
    const games: string[] = useGameManifest()

    function unselectGame(){
        setGame(null);
    }

    if (game) {
        return (
            <>
                <GameView
                    game={game}
                    unselectGame={unselectGame}
                />
            </>
        )
    } else {
        return (
            <main className="app">
                <div className="container">
                    <h1>Line Browser</h1>
                    {games.length > 0 && games.map(currentGame =>
                        <p key={currentGame} onClick={() => setGame(currentGame)}>{currentGame}</p>
                    )}
                    {games.length === 0 && <p>No games found</p>}
                </div>
            </main>
        );
    }

}

export default App
