import './App.css'
import GameView from "./GameView.tsx";
import {useState} from "react";
import {useGameManifest} from "./hooks/useGameManifest.ts"
import GameGrid from "./components/GameGrid.tsx";

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
                <GameGrid selectGame={() => setGame(currentGame)} key={currentGame} game={currentGame}/>
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
                <h1>Line Browser</h1>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 220px)",
                    gap: "20px",
                }} className="container">
                    {resolveGameSelectorScreen()}
                </div>
            </main>
        );
    }

}

export default App
