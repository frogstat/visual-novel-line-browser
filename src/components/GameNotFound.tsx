import errorImage from "../assets/pepehands.png"
import {useRouteError} from "react-router-dom";

function GameNotFound() {
    const error:any = useRouteError();
    return (
        <div className="error-panel">
            <h1>404</h1>
            <h1>{error?.message ?? "The requested item was not found"}</h1>
            <img src={errorImage} alt="error"/>
        </div>
    )

}

export default GameNotFound;