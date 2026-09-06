import {useEffect, useRef, useState} from "react";
import {loadJson} from "../utils/loadJson.ts";

const DEFAULT_VOLUME: number = 0.3;

export function useMusicPlayer(baseMusicPath: string) {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [tracks, setTracks] = useState<string[]>([]);
    const [failedTracks, setFailedTracks] = useState<string[]>([]);

    const [currentTrack, setCurrentTrack] = useState<string | undefined>();
    const [volume, setVolume] = useState<number>(DEFAULT_VOLUME);
    const [isPlaying, setIsPlaying] = useState(false);

    // 1. Load the manifest whenever the music path changes.
    useEffect(() => {
        let cancelled = false;

        setTracks([]);
        setFailedTracks([]);
        setCurrentTrack(undefined);
        setIsPlaying(false);

        loadJson<string[]>(`${baseMusicPath}/manifest.json`)
            .then(musicData => {
                if (!cancelled) {
                    setTracks(musicData);
                }
            })
            .catch(() => console.log("No music found"));

        return () => {
            cancelled = true;
        };
    }, [baseMusicPath]);

    // 2. Once tracks arrive, kick off playback with a random track.
    useEffect(() => {
        if (tracks.length === 0) {
            return;
        }
        playRandomTrack();
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

        audio.addEventListener("ended", playRandomTrack);
        audio.addEventListener("error", handleError);

        return () => {
            audio.removeEventListener("ended", playRandomTrack);
            audio.removeEventListener("error", handleError);
            audio.pause();
            audio.currentTime = 0;
            if (audioRef.current === audio) {
                audioRef.current = null;
            }
        };
    }, [currentTrack, baseMusicPath]);

    function handleError() {
        console.error(`Failed to load track: ${currentTrack}`)
        if (currentTrack) {
            setFailedTracks(prev => [...prev, currentTrack]);
        }
        playRandomTrack();
    }


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

    // 6. All failed tracks will be treated as no tracks, and the same code for no music works to remove the player.
    useEffect(() => {
        if (failedTracks.length === 0 || tracks.length === 0) {
            return;
        }
        if (failedTracks.length === tracks.length) {
            setTracks([]);
        }
    }, [failedTracks, tracks]);

    // GUESS WHAT THIS DOES
    function togglePause() {
        setIsPlaying(current => !current);
    }

    function playRandomTrack() {
        setCurrentTrack(prev => {
            try {
                return pickRandomTrack(tracks, prev, failedTracks)
            } catch (error) {
                console.error("Couldn't find valid track");
                setIsPlaying(false);
                return undefined;
            }
        });
    }


    return {
        tracks,
        currentTrack,
        volume,
        setVolume,
        isPlaying,
        togglePause,
        playNextTrack: playRandomTrack
    };
}

function pickRandomTrack(tracks: string[], excludeTrack: string | undefined, failedTracks: string[]): string {
    const candidates = tracks.filter(track => track !== excludeTrack && !failedTracks.includes(track));

    if (candidates.length === 0) {
        throw new Error("Could not find any valid tracks.");
    }

    if (candidates.length === 1) {
        return candidates[0];
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}