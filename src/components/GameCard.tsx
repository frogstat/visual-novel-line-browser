import fallback from "../assets/fallback.png"
import {useState} from "react";
import type {Game} from "../utils/types.ts";


type GameGridProps = {
    game: Game,
    selectGame: () => void
}


function GameCard({game, selectGame}: GameGridProps) {

    const [imageSrc, setImageSrc] = useState(resolveGameCover());


    function resolveGameCover() {
        return `/${encodeURIComponent(game.folderName)}/cover.png`
    }

    const basePath = `/${encodeURIComponent(game.folderName)}`;
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

    function resolveGameTitle() {
        if (game.title.endsWith("なく頃に")) {
            const base = game.title.slice(0, -4);
            return <p>{base}<span style={{color: "red"}}>な</span>く頃に</p>
        } else {
            return <p>{game.title}</p>
        }
    }

    return (
        <div onClick={selectGame} className="game-card">
            <img
                className="game-card-image"
                src={imageSrc}
                alt="cover"
                onError={handleImageError}/>
            {resolveGameTitle()}
        </div>

    );


}

export default GameCard;
