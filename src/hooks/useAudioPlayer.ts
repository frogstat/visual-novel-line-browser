import {useEffect, useRef} from "react";

export function useAudioPlayer(voiceBasePath:string){
    const currentAudio = useRef<HTMLAudioElement | null>(null);

    function playVoice(voiceFile:string | null | undefined){
        if (!voiceFile){
            return;
        }

        if (currentAudio.current) {
            currentAudio.current.pause();
            currentAudio.current.currentTime = 0;
        }

        const audio = new Audio(`${voiceBasePath}/${voiceFile}`);
        currentAudio.current = audio;
        audio.play().catch(error => {
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
    return playVoice;
}