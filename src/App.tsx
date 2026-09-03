import './App.css'
import GameView from "./GameView.tsx";
import {useState} from "react";
import {useGameManifest} from "./hooks/useGameManifest.ts"

function App() {
    const [game, setGame] = useState<string | null>(null)
    const games: string[] = useGameManifest()

    if (game) {
        return (
            <>
                <h1>{game}</h1>
                <GameView/>
            </>
        )
    } else {
        return (
            <main className="app">
                <div className="container">
                    <h1>Line Browser</h1>
                    {
                        games.map(currentGame =>
                            <p key={currentGame} onClick={() => setGame(currentGame)}>{currentGame}</p>
                        )

                    }

                </div>
            </main>
        );
    }

}

export default App
