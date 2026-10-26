import errorImage from "../assets/pepehands.png"

function GameNotFound({message}: {message: string | undefined}) {

    return (
        <div className="error-panel">
            <h1>404</h1>
            <h1>{message ?? "404 - Not Found"}</h1>
            <img src={errorImage} alt="error"/>
        </div>
    )

}

export default GameNotFound;