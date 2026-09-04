import {useEffect, useState} from "react";
import type {Line} from "../utils/Line.ts";
import {loadJson} from "../utils/loadJson.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const voiceBasePath: string = `/${encodeURIComponent(game)}/voice`;

    useEffect(() =>{

         function loadGame(){
             const base = `/${encodeURIComponent(game)}`;

             loadJson(base + "/lines.json").then(linesData => {
                 setLines(linesData)
             }).catch(e => {
                 throw Error(e);
             });
        }

        loadGame();

    },[game])

    return {
        lines,
        voiceBasePath
    }
}

