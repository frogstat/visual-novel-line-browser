import fallback from "../assets/fallback.png"
import {useState} from "react";
import type {Game} from "../utils/types.ts";


type GameGridProps = {
    game: Game,
    selectGame: () => void
}

const coverStyle = {
    height: 300,
    width: 200,
    marginTop:10
}

function GameCard({game, selectGame}: GameGridProps) {

    const [imageSrc, setImageSrc] = useState(resolveGameCover());

    function resolveGameCover() {
        return `/${encodeURIComponent(game.folderName)}/cover.png`
    }

    return (
        <div onClick={selectGame} className="game-card">
            <img
                style={coverStyle}
                src={imageSrc}
                alt="cover"
                onError={() => {
                    if (imageSrc !== fallback) {
                        setImageSrc(fallback);
                    }
                }}/>
            <p>{game.title}</p>
        </div>

    );


}

export default GameCard;