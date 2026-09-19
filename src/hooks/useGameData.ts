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

    const audioFolder = resolveAudioFolder(gameFolder);
    const voiceBasePath: string = `/${audioFolder}/voice`;
    const musicBasePath: string = `/${audioFolder}/music`;

    const gamePath: string = gameFolder

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
                const linesData = await loadJson<Line[]>(`/${gamePath}/lines.json`);

                let charactersData: Characters | null;
                let languagesData: string[];

                try{
                    languagesData = await loadJson<string[]>(`/${gamePath}/languages.json`);
                } catch (Error){
                    console.log("No languages found. Disabling language feature.");
                    languagesData = [""]
                }

                try {
                    charactersData = await loadJson<Characters>(`/${gamePath}/characters.json`)
                    const codeLength = Object.keys(charactersData)[0]?.length ?? 0;
                    const normalizedLinesData =
                        normalizeSpeakerNameFromVoiceLine(
                            linesData,
                            languagesData,
                            charactersData,
                            codeLength);
                    setLines(normalizedLinesData)

                } catch (Error){
                    console.log("No characters found. Disabling character search.");
                    charactersData = null
                    setLines(linesData)
                }

                setLanguages(languagesData)
                setCurrentLanguage(languagesData[0])
                setCharacters(charactersData)





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
        theme.href = `/${gameFolder}/theme.css`;
        theme.dataset.gameTheme = "true";
        document.head.appendChild(theme);

        theme.onerror = () => {
            console.log("Custom theme not found. Using default.")
            theme.remove();
        };

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
            let speaker_key = "";
            if (!language) {
                speaker_key = "speaker";
            } else {
                speaker_key = `speaker_${language}`
            }

            normalizedLine[speaker_key as keyof Line] = resolveSpeaker(
                jsonLine.voice_file,
                characters,
                codeLength,
                language,
                jsonLine);

        }
        return normalizedLine;
    })
}

