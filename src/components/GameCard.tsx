import fallback from "../assets/fallback.png"
import {useState} from "react";

type GameGridProps = {
    game: string,
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
        return `/${encodeURIComponent(game)}/cover.png`
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
            <p>{game}</p>
        </div>

    );


}

export default GameCard;