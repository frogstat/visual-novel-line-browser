import {useEffect, useState} from "react";
import type {Characters, Line} from "../utils/types.ts";
import {loadJson} from "../utils/loadJson.ts";
import {resolveSpeaker} from "../utils/lineParser.ts";

function resolveAudioFolder(gameFolder: string): string {
    if (gameFolder.endsWith(" ALTFOLDER")) {
        return gameFolder.slice(0, -" ALTFOLDER".length);
    }

    return gameFolder;
}

export function useGameData(gameFolder: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const [characters, setCharacters] = useState<Characters | null>(null);
    const [languages, setLanguages] = useState<string[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const audioFolder = encodeURIComponent(resolveAudioFolder(gameFolder));
    const voiceBasePath: string = `/${audioFolder}/voice`;
    const musicBasePath: string = `/${audioFolder}/music`;

    const gamePath: string = encodeURIComponent(gameFolder)

    const codeLength = characters
        ? Object.keys(characters)[0]?.length ?? 0
        : 0;

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
                const codeLength = Object.keys(charactersData)[0]?.length ?? 0;

                const normalizedLinesData =
                    normalizeSpeakerNameFromVoiceLine(
                        linesData,
                        languagesData,
                        charactersData,
                        codeLength);

                setLines(normalizedLinesData)

            } catch (Error: Error | any) {
                setError(Error.toString());
                console.error(Error);
                setLines([]);
                setCharacters(null);
                setCurrentLanguage("");
            }
        }

        loadData();

    }, [gameFolder])

    useEffect(() => {
        const theme = document.createElement("link");

        theme.rel = "stylesheet";
        theme.href = `/${encodeURIComponent(gameFolder)}/theme.css`;
        theme.dataset.gameTheme = "true";

        theme.onerror = () => {
            console.log("Custom theme not found. Using default.")
            theme.remove();
        };

        document.head.appendChild(theme);

        return () => {
            theme.remove();
        };
    }, [gameFolder]);


    return {
        lines,
        voiceBasePath,
        musicBasePath,
        characters,
        languages,
        currentLanguage,
        setCurrentLanguage,
        error,
        codeLength,
    }
}

// Will change speaker names to be based off voice lines instead of the speaker tag in the JSON.
// If no such resolution is possible, the existing tag will be used.
function normalizeSpeakerNameFromVoiceLine(jsonLines: Line[], languages: string[], characters: Characters, codeLength: number): Line[] {
    if (!jsonLines || !languages || !characters) {
        return jsonLines;
    }


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

