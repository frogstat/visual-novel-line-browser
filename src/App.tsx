import './App.css'
import {Link} from "react-router-dom";
import {type GameData, useGameManifest} from "./hooks/useGameManifest.ts"
import GameCard from "./components/GameCard.tsx";
import type {Game} from "./utils/types.ts";

const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    display: "block",
}

function App() {
    const games: GameData | null = useGameManifest()


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
                    <Link key={folderName} to={`/games/${encodeURIComponent(folderName)}`} style={linkStyle}>
                        <GameCard
                            game={currentGame}
                        />
                    </Link>
                );
            });
        }
    }


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

export default App
