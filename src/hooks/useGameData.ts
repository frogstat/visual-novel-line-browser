import {useEffect, useState} from "react";
import type {Languages, Line} from "../utils/types.ts";
import {loadJson} from "../utils/loadJson.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const [characters, setCharacters] = useState(null);
    const [languages, setLanguages] = useState<Languages>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>("");

    const voiceBasePath: string = `/${encodeURIComponent(game)}/voice`;
    const musicBasePath: string = `/${encodeURIComponent(game)}/music`;

    const codeLength = characters
        ? Object.keys(characters)[0]?.length ?? 0
        : 0;

    const gamePath: string = encodeURIComponent(game)

    useEffect(() => {
        setLines(null);
        setCharacters(null);
        setLanguages([]);
        setCurrentLanguage("");

        function loadLines() {
            const linesJsonFile = `/${gamePath}/lines.json`;

            loadJson<Line[]>(linesJsonFile).then(linesData => {
                setLines(linesData)
            }).catch(e => {
                console.error("FAILED TO READ " + linesJsonFile + "\n" + e)
                setLines([])
            });
        }

        function loadCharacters() {
            const charactersJsonFile = `/${gamePath}/characters.json`;

            loadJson<any>(charactersJsonFile).then(charactersData => {
                setCharacters(charactersData)
            }).catch(e => {
                console.error("FAILED TO READ " + charactersJsonFile + "\n" + e)
            })
        }

        function loadLanguages() {
            const languagesJsonFile = `/${gamePath}/languages.json`;

            loadJson<Languages>(languagesJsonFile).then(languagesData => {
                if (!languagesData || languagesData.length === 0) {
                    throw new Error("No languages found.");
                }
                setLanguages(languagesData)
                setCurrentLanguage(languagesData[0])
            }).catch(e => {
                console.error("FAILED TO READ " + languagesJsonFile + "\n" + e)
            })
        }

        loadLines();
        loadCharacters()
        loadLanguages();

    }, [game])


    return {
        lines,
        voiceBasePath,
        musicBasePath,
        characters,
        codeLength,
        languages,
        currentLanguage,
        setCurrentLanguage
    }
}

