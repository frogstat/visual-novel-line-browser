import {useEffect, useState} from "react";
import type {Line} from "../utils/Line.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    //const voiceBasePath: string = gameFolder + "/voice";

    useEffect(() =>{

        async function loadGame(){
            try {
                const base = `/${encodeURIComponent(game)}`;
                const linesResponse = await fetch(base + "/lines.json");

                if (!linesResponse.ok) {
                    throw new Error(`Could not load ${base}/lines.json`);
                }

                const linesData = await linesResponse.json();
                setLines(linesData)
            } catch (error){
                console.error(error)
            }
        }

        loadGame();


    },[game])

    return {
        //game,
        lines
        //voiceBasePath
    }
}

