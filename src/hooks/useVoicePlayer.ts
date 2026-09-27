import {useEffect, useRef, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";
import type {VoiceIndex} from "../utils/types.ts";

export function useVoicePlayer(voiceBasePath: string) {
    const currentAudio = useRef<HTMLAudioElement | null>(null);
    const [voiceIndex, setVoiceIndex] = useState<VoiceIndex | null>(null);
    useEffect(() => {
        setVoiceIndex(null);

        async function loadVoiceIndex() {
            loadJson<VoiceIndex>(`${voiceBasePath}/voice_index.json`).then((data: VoiceIndex) => {
                setVoiceIndex(data);
            }).catch(console.error);
        }

        loadVoiceIndex();

    }, [voiceBasePath]);

    function playVoice(voiceFile: string | null | undefined) {
        createVoiceFile(voiceFile).then(([fileName, blob]) => {
            playVoiceAudio(fileName, blob)
        }).catch(console.error);
    }

    function downloadVoiceFile(voiceFile: string | null | undefined) {
        createVoiceFile(voiceFile).then(([fileName, blob]) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName.replaceAll("/", "_");
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        }).catch(console.error);
    }


    async function createVoiceFile(voiceFile: string | null | undefined):Promise<[string,Blob]> {
        if (!voiceFile || !voiceIndex) {
            throw new Error("Voice file not found");
        }

        const entry = voiceIndex[voiceFile];

        if (!entry) {
            throw new Error(`${voiceFile} not found in index!`);
        }

        const [offset, length] = entry;

        const response = await fetch(`${voiceBasePath}/voice.bundle`, {
            headers: {
                Range: `bytes=${offset}-${offset + length - 1}`
            }
        });

        if (!response.ok && response.status !== 206) {
            throw new Error(
                `Failed to load ${voiceFile}: HTTP ${response.status}`
            );
        }

        const blob = await response.blob()
        return [voiceFile, blob];
    }

    function playVoiceAudio(voiceFile: string, audioBlob: Blob) {
        if (currentAudio.current) {
            currentAudio.current.pause();
            currentAudio.current.currentTime = 0;
        }

        const url = URL.createObjectURL(audioBlob);
        const audio = new Audio(url);

        currentAudio.current = audio;
        audio.play().then(() => {
            console.log("[VOICE] playing " + voiceFile);
        }).catch(error => {
            console.error(`Failed to play ${voiceBasePath}/${voiceFile}:`, error);
        });

        audio.addEventListener("ended", () => {
            if (currentAudio.current === audio) {
                currentAudio.current = null;
            }
        });
    }

    useEffect(() => {
        return () => {
            currentAudio.current?.pause();
            currentAudio.current = null;
        };
    }, []);
    return {
        downloadVoiceFile,
        playVoice,
    };
}