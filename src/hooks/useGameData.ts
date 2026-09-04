import {useEffect, useState} from "react";
import type {Line} from "../utils/Line.ts";
import {loadJson} from "../utils/loadJson.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const [characters, setCharacters] = useState(null);
    const voiceBasePath: string = `/${encodeURIComponent(game)}/voice`;
    const codeLength = characters
        ? Object.keys(characters)[0]?.length ?? 0
        : 0;

    useEffect(() => {

        function loadLines() {
            const linesJsonFile = `/${encodeURIComponent(game)}/lines.json`;

            loadJson<Line[]>(linesJsonFile).then(linesData => {
                setLines(linesData)
            }).catch(e => {
                console.error("FAILED TO READ " + linesJsonFile + "\n" + e)
                setLines([])
            });
        }

        function loadCharacters() {
            const charactersJsonFile = `/${encodeURIComponent(game)}/characters.json`;

            loadJson<any>(charactersJsonFile).then(charactersData => {
                setCharacters(charactersData)
            }).catch(e => {
                console.error("FAILED TO READ " + charactersJsonFile + "\n" + e)
            })


        }

        loadLines();
        loadCharacters()

    }, [game])


    return {
        lines,
        voiceBasePath,
        characters,
        codeLength,
    }
}

