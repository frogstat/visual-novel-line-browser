import {useEffect, useState} from "react";
import type {Characters, Line, Metadata} from "../utils/types.ts";
import {loadJson} from "../utils/loadJson.ts";
import {resolveSpeaker} from "../utils/lineParser.ts";

function resolveAudioFolder(gameFolder: string): string {
    if (gameFolder.endsWith(" ALTFOLDER")) {
        return gameFolder.slice(0, -" ALTFOLDER".length);
    }

    return gameFolder;
}

export function useGameData(gameFolderRaw: string) {
    const [lines, setLines] = useState<Line[] | null>(null);
    const [characters, setCharacters] = useState<Characters | null>(null);
    const [languages, setLanguages] = useState<string[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [codeLength, setCodeLength] = useState<number | null>(null);

    const gameFolder = encodeURIComponent(gameFolderRaw);
    const audioFolder = encodeURIComponent(resolveAudioFolder((gameFolderRaw)));
    const voiceBasePath: string = `/${audioFolder}/voice`;
    const musicBasePath: string = `/${audioFolder}/music`;




    useEffect(() => {
        setLines(null);
        setCharacters(null);
        setCodeLength(null);
        setLanguages([]);
        setCurrentLanguage("");

        async function loadData() {
            try {
                const linesData = await loadJson<Line[]>(`/${gameFolder}/lines.json`);

                let charactersData: Characters | null;
                let languagesData: string[];

                let metadata: Metadata | undefined;
                try {
                    metadata = await loadJson<Metadata>(`/${gameFolder}/metadata.json`);
                    languagesData = metadata.languages ?? [""];
                } catch (Error) {
                    console.log("No metadata found. Disabling language and character code feature.");
                    languagesData = [""]
                }

                try {
                    charactersData = await loadJson<Characters>(`/${gameFolder}/characters.json`)
                    if (metadata?.hasCharacterCode ?? false) {
                        const codeLengthData = Object.keys(charactersData)[0]?.length || null;
                        setCodeLength(codeLengthData);

                        const normalizedLinesData =
                            normalizeSpeakerNameFromVoiceLine(
                                linesData,
                                languagesData,
                                charactersData,
                                codeLengthData);

                        setLines(normalizedLinesData)
                    } else {
                        setLines(linesData)
                    }

                } catch (Error) {
                    console.log("No characters found. Disabling character search.");
                    charactersData = null
                    setLines(linesData)
                }

                setLanguages(languagesData)
                setCharacters(charactersData)

                const startingLanguage = resolveStartingLanguage(
                    localStorage.getItem("preferred-language"), languagesData
                );
                setCurrentLanguage(startingLanguage)


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
        let cancelled = false;
        let theme: HTMLStyleElement | undefined;

        async function loadTheme() {
            const response = await fetch(`/${gameFolder}/theme.css`);
            if (!response.ok) {
                throw Error();
            }

            const contentType: string = response.headers.get("content-type") ?? "";

            if (!contentType.includes("text/css")) {
                throw Error();
            }

            return await response.text();
        }

        loadTheme().then(css => {
            if (cancelled) return;
            console.log("Using custom theme");
            theme = document.createElement("style");
            theme.textContent = css;
            document.head.appendChild(theme);

        }).catch(() => console.log("No theme found. Using default theme."));

        return () => {
            cancelled = true;
            theme?.remove();
        };

    }, [gameFolder]);

    // Handles explicit language switches
    function changeLanguage(language: string) {
        setCurrentLanguage(language)
        localStorage.setItem("preferred-language", language);
    }

    function resolveStartingLanguage(storedLanguage: string | null, availableLanguages: string[]): string {
        if (!storedLanguage || !availableLanguages.includes(storedLanguage)) {
            return availableLanguages[0];
        }
        return storedLanguage;
    }

    return {
        lines,
        voiceBasePath,
        musicBasePath,
        characters,
        languages,
        currentLanguage,
        changeLanguage,
        error,
        codeLength
    }
}

// Will change speaker names to be based off voice lines instead of the speaker tag in the JSON.
// If no such resolution is possible, the existing tag will be used.
function normalizeSpeakerNameFromVoiceLine(jsonLines: Line[], languages: string[], characters: Characters, codeLength: number | null): Line[] {
    if (!jsonLines || !languages || !characters || !codeLength) {
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

