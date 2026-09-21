import AudioSlider from "./AudioSlider.tsx";
import pauseButton from "../../assets/pause-icon.svg"
import playButton from "../../assets/play-icon.svg"
import nextIcon from "../../assets/next-icon.svg"
import {getFileWithoutExtension} from "../../utils/generalUtils.ts";
import type {CSSProperties} from "react";
import SvgIcon from "../SvgIcon.tsx";

type AudioPlayerProps = {
    currentTrack: string
    volume: number,
    changeVolume: (volume: number) => void,
    playNextTrack: () => void,
    isPlaying: boolean,
    togglePause: () => void
}

function AudioPlayer({currentTrack, volume, changeVolume, playNextTrack, isPlaying, togglePause}: AudioPlayerProps) {
    return (
        <div className="audio-player-container">
            <p className="track-title">{currentTrack && getFileWithoutExtension(currentTrack)}</p>

            <div className="audio-controls">
                <div className="buttons">
                    <button className="audio-player-button" onClick={togglePause}>
                        <SvgIcon label={isPlaying ? "pause" : "play"} icon={isPlaying ? pauseButton : playButton}/>
                    </button>
                    <button className="audio-player-button" onClick={playNextTrack}>
                        <SvgIcon label={"next"} icon={nextIcon}/>
                    </button>
                </div>

                <AudioSlider volume={volume} changeVolume={changeVolume}/>
            </div>
        </div>
    )
}

export default AudioPlayer;