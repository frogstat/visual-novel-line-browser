import {useEffect, useState} from "react";
import type {Line} from "../utils/Line.ts";
import {loadJson} from "../utils/loadJson.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const voiceBasePath: string = `/${encodeURIComponent(game)}/voice`;

    useEffect(() =>{

         function loadGame(){
             const linesJsonFile = `/${encodeURIComponent(game)}/lines.json`;

             loadJson(linesJsonFile).then(linesData => {
                 setLines(linesData)
             }).catch(e => {
                 console.error("FAILED TO READ " + linesJsonFile + "\n" + e)
                 setLines([])
             });
        }

        loadGame();

    },[game])

    return {
        lines,
        voiceBasePath
    }
}

