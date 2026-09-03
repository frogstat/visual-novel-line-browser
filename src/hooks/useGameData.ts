import {useEffect, useState} from "react";
import type {Line} from "../utils/Line.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const gameFolder: string = game;
    //const voiceBasePath: string = gameFolder + "/voice";

    useEffect(() =>{

        async function loadGame(){
            const base = `/${encodeURIComponent(gameFolder)}`;
            const linesResponse = await fetch (base + "/lines.json");
            if(!linesResponse.ok){
                throw new Error("Could not load " + base + "/lines.json")
            }
            const linesData = await linesResponse.json();
            setLines(linesData)
        }

        loadGame();


    },[gameFolder])

    return {
        //gameFolder,
        lines
        //voiceBasePath
    }
}

