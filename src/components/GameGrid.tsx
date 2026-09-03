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

function GameGrid({game, selectGame}: GameGridProps) {

    function resolveGameCover() {
        return `/${encodeURIComponent(game)}/cover.png`
    }

    return (
        <div onClick={selectGame} style={{backgroundColor: "darkcyan", cursor:"pointer", width:"220px",display:"flex", flexDirection:"column", alignItems:"center"}} className="game-grid-container">
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

export default GameGrid;