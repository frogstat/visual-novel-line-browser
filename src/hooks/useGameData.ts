import {useEffect, useState} from "react";
import type {Characters, Line} from "../utils/types.ts";
import {loadJson} from "../utils/loadJson.ts";
import {resolveSpeaker} from "../utils/lineParser.ts";

export function useGameData(game: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const [characters, setCharacters] = useState<Characters | null>(null);
    const [languages, setLanguages] = useState<string[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>("");

    const voiceBasePath: string = `/${encodeURIComponent(game)}/voice`;
    const musicBasePath: string = `/${encodeURIComponent(game)}/music`;

    const gamePath: string = encodeURIComponent(game)

    useEffect(() => {
        setLines(null);
        setCharacters(null);
        setLanguages([]);
        setCurrentLanguage("");

        async function loadData() {
            try {
                const [linesData, charactersData, languagesData] = await Promise.all([
                    loadJson<Line[]>(`/${gamePath}/lines.json`),
                    loadJson<Characters>(`/${gamePath}/characters.json`),
                    loadJson<string[]>(`/${gamePath}/languages.json`)
                ]);

                if (languagesData.length === 0) {
                    throw new Error("No languages found.");
                }

                setLanguages(languagesData)
                setCurrentLanguage(languagesData[0])

                setCharacters(charactersData)

                const normalizedLinesData=
                    normalizeSpeakerNameFromVoiceLine(
                        linesData,
                        languagesData,
                        charactersData);

                setLines(normalizedLinesData)


            } catch (Error) {
                console.error(Error);
                setLines([]);
                setCharacters(null);
                setCurrentLanguage("");
            }
        }

        loadData();

    }, [game])


    return {
        lines,
        voiceBasePath,
        musicBasePath,
        characters,
        languages,
        currentLanguage,
        setCurrentLanguage
    }
}

// Will change speaker names to be based off voice lines instead of the speaker tag in the JSON.
// If no such resolution is possible, the existing tag will be used.
function normalizeSpeakerNameFromVoiceLine(jsonLines: Line[], languages: string[], characters: Characters): Line[] {
    if (!jsonLines || !languages || !characters) {
        return jsonLines;
    }

    const codeLength = characters
        ? Object.keys(characters)[0]?.length ?? 0
        : 0;

    if (codeLength === 0) {
        return jsonLines;
    }

    return jsonLines.map((jsonLine) => {
        if (!jsonLine.voice_file) {
            return jsonLine;
        }

        const normalizedLine = {...jsonLine};

        for (const language of languages) {
            normalizedLine[`speaker_${language}`] = resolveSpeaker(
                jsonLine.voice_file,
                characters,
                codeLength,
                language,
                jsonLine);
        }
        return normalizedLine;
    })
}

