import fallback from "../assets/fallback.png"
import {useState} from "react";
import type {Game} from "../utils/types.ts";
import {gamesServer} from "../main.tsx";


type GameGridProps = {
    game: Game,
    selectGame: () => void
}


function GameCard({game, selectGame}: GameGridProps) {

    const [imageSrc, setImageSrc] = useState(resolveGameCover());


    function resolveGameCover() {
        return `${gamesServer}/${encodeURIComponent(game.folderName)}/cover`
    }

    const basePath = `${gamesServer}/${encodeURIComponent(game.folderName)}`;
    const png = `${basePath}/cover.png`;
    const jpg = `${basePath}/cover.jpg`;
    const jpeg = `${basePath}/cover.jpeg`;

    function handleImageError() {
        if (imageSrc === png) {
            setImageSrc(jpg);
        } else if (imageSrc === jpg) {
            setImageSrc(jpeg);
        } else {
            setImageSrc(fallback);
        }
    }

    return (
        <div onClick={selectGame} className="game-card">
            <img
                className="game-card-image"
                src={imageSrc}
                alt="cover"
                onError={handleImageError}/>
            <p>{game.title}</p>
        </div>

    );


}

export default GameCard;