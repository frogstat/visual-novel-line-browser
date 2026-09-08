import './App.css'
import GameView from "./GameView.tsx";
import {useState} from "react";
import {type GameData, useGameManifest} from "./hooks/useGameManifest.ts"
import GameCard from "./components/GameCard.tsx";
import type {Game} from "./utils/types.ts";



function App() {
    const [game, setGame] = useState<Game | null>(null)
    const games: GameData | null = useGameManifest()

    function unselectGame() {
        setGame(null);

    }

    function resolveGameSelectorScreen() {
        if (games === null) {
            return <p>Loading...</p>
        } else if (Object.keys(games).length === 0) {
            return <p>No games found</p>
        } else {
            return Object.entries(games).map(([folderName, title]) => {
                const currentGame: Game = {
                    folderName: folderName,
                    title: title
                };

                return (
                    <GameCard
                        selectGame={() => setGame(currentGame)}
                        key={folderName}
                        game={currentGame}
                    />
                );
            });
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
                <div className="game-selector-screen">
                    <h1 style={{textAlign: "center"}}>Line Browser</h1>
                    <div className="game-selector-container">
                        {resolveGameSelectorScreen()}
                    </div>
                </div>

            </main>
        );
    }

}

export default App
