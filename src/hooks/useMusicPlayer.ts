import {useEffect, useRef, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";

const DEFAULT_VOLUME: number = 0.3;

export function useMusicPlayer(baseMusicPath: string) {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [tracks, setTracks] = useState<string[]>([]);
    const [currentTrack, setCurrentTrack] = useState<string | undefined>();
    const [volume, setVolume] = useState<number>(DEFAULT_VOLUME);
    const [isPlaying, setIsPlaying] = useState(false);

    // 1. Load the manifest whenever the music path changes.
    useEffect(() => {
        let cancelled = false;

        setTracks([]);
        setCurrentTrack(undefined);
        setIsPlaying(false);

        loadJson<string[]>(`${baseMusicPath}/manifest.json`)
            .then(musicData => {
                if (!cancelled) {
                    setTracks(musicData);
                }
            })
            .catch(console.error);

        return () => {
            cancelled = true;
        };
    }, [baseMusicPath]);

    // 2. Once tracks arrive, kick off playback with a random track.
    useEffect(() => {
        if (tracks.length === 0) {
            return;
        }
        setCurrentTrack(pickRandomTrack(tracks, undefined));
        setIsPlaying(true);
    }, [tracks]);

    // 3. Create/destroy the Audio element for the current track.
    useEffect(() => {
        if (!currentTrack) {
            return;
        }
        const audio = new Audio(`${baseMusicPath}/${currentTrack}`);
        audio.volume = volume;
        audioRef.current = audio;

        audio.addEventListener("ended", playNextTrack);

        return () => {
            audio.removeEventListener("ended", playNextTrack);
            audio.pause();
            audio.currentTime = 0;
            if (audioRef.current === audio) {
                audioRef.current = null;
            }
        };
    }, [currentTrack, baseMusicPath]);


    // 4. Single source of truth for actually playing/pausing.
    // Runs whenever the track changes OR the user toggles pause,
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        if (isPlaying) {
            audio.play().catch(error => {
                console.error(error);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrack]);

    // 5. Keep volume in sync on the currently playing element.
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // GUESS WHAT THIS DOES
    function togglePause() {
        setIsPlaying(current => !current);
    }

    function playNextTrack() {
        setCurrentTrack(prev => pickRandomTrack(tracks, prev));
    }

    return {
        currentTrack,
        volume,
        setVolume,
        isPlaying,
        togglePause,
        playNextTrack
    };
}

function pickRandomTrack(tracks: string[], excludeTrack: string | undefined): string {
    if (tracks.length === 0) {
        throw new Error("Cannot pick a track from an empty list.");
    }
    if (tracks.length === 1) {
        return tracks[0];
    }
    const candidates = excludeTrack === undefined
        ? tracks
        : tracks.filter(track => track !== excludeTrack);
    return candidates[Math.floor(Math.random() * candidates.length)];
}