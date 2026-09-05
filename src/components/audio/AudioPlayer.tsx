import AudioSlider from "./AudioSlider.tsx";

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
            <p style={{fontSize:"12px"}}>{currentTrack}</p>
            <AudioSlider volume={volume} setVolume={setVolume}/>
            <button className="audio-player-next-button" onClick={playNextTrack}>⏭</button>
            <button className="audio-player-pause-button" onClick={togglePause}>{isPlaying ? "⏸️" : "▶"}️</button>
        </div>
    )


}

export default AudioPlayer;