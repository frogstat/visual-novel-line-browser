import {useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import type {GameData} from "./hooks/useGameManifest.ts";
import type {Game} from "./utils/types.ts";
import GameNotFound from "./components/NotFound.tsx";
import GameView from "./GameView.tsx";

function gameViewValidator() {
    const {gameFolder} = useParams<{ gameFolder: string }>();
    const [game, setGame] = useState<Game | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!gameFolder) {
            setIsLoading(false);
        } else {
            fetch("/manifest.json")
                .then(res => res.json())
                .then((gamesData:GameData) => {
                    const foundKey = Object.keys(gamesData)
                        .find(key => key.toLowerCase() === gameFolder.toLowerCase());
                    if(foundKey) {
                        setGame({
                            folderName: foundKey,
                            title: gamesData[foundKey]
                        })
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, [gameFolder]);

    if(isLoading) {
        return(<></>)
    } else if (!gameFolder) {
        return <GameNotFound message={"No game selected"}/>
    } else if (!game){
        return <GameNotFound message={`Game "${gameFolder}" not found`}/>
    } else {
        return <GameView game={game}/>
    }


}

export default gameViewValidator;