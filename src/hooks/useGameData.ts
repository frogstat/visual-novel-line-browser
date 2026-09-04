import {useEffect, useState} from "react";
import type {Line} from "../utils/Line.ts";
import {loadJson} from "../utils/loadJson.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const [characters, setCharacters] = useState(null);
    const voiceBasePath: string = `/${encodeURIComponent(game)}/voice`;

    useEffect(() =>{

         function loadLines(){
             const linesJsonFile = `/${encodeURIComponent(game)}/lines.json`;

             loadJson(linesJsonFile).then(linesData => {
                 setLines(linesData)
             }).catch(e => {
                 console.error("FAILED TO READ " + linesJsonFile + "\n" + e)
                 setLines([])
             });
        }

        function loadCharacters(){
             const charactersJsonFile = `/${encodeURIComponent(game)}/characters.json`;

             loadJson(charactersJsonFile).then(charactersData => {
                 setCharacters(charactersData)
                 const keys = Object.keys(charactersData)
                 for(let key of keys){
                     console.log(charactersData[key].name_en)
                 }
             }).catch(e => {
                 console.error("FAILED TO READ " + charactersJsonFile + "\n" + e)
                 setCharacters([])
             })





        }

        loadLines();loadCharacters()

    },[game])

    return {
        lines,
        voiceBasePath
    }
}

