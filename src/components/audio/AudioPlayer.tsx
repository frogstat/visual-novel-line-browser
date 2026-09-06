import AudioSlider from "./AudioSlider.tsx";
import pauseButton from "../../assets/pause-icon.svg"
import playButton from "../../assets/play-icon.svg"
import nextIcon from "../../assets/next-icon.svg"
import {getFileWithoutExtension} from "../../utils/generalUtils.ts";

type AudioPlayerProps = {
    currentTrack: string
    volume: number,
    setVolume: (volume: number) => void,
    playNextTrack: () => void,
    isPlaying: boolean,
    togglePause: () => void
}

function AudioPlayer({currentTrack, volume, setVolume, playNextTrack, isPlaying, togglePause}: AudioPlayerProps) {
    return (
        <div className="audio-player-container">
            <p className="track-title">{currentTrack && getFileWithoutExtension(currentTrack)}</p>

            <div className="audio-controls">
                <div className="buttons">
                    <button className="audio-player-button" onClick={togglePause}>
                        <img src={isPlaying ? pauseButton : playButton} alt={isPlaying ? "pause" : "play"}/>
                    </button>

                    <button className="audio-player-button" onClick={playNextTrack}>
                        <img src={nextIcon} alt="next"/>
                    </button>
                </div>

                <AudioSlider volume={volume} setVolume={setVolume}/>
            </div>
        </div>
    )


}

export default AudioPlayer;