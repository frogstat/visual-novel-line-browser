import fallback from "../assets/fallback.png"

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

    function resolveGameCover() {
        return `/${encodeURIComponent(game)}/cover.png`
    }

    return (
        <div onClick={selectGame} className="game-card">
            <img
                style={coverStyle}
                src={resolveGameCover()}
                alt="cover"
                onError={(e) => {
                    e.currentTarget.src = fallback;
                }}/>
            <p>{game}</p>
        </div>

    );


}

export default GameCard;