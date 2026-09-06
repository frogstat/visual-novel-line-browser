type AudioSliderProps = {
    volume: number,
    setVolume(volume: number): void
}


function AudioSlider({volume, setVolume}: AudioSliderProps) {

    return (
        <input className="volume-slider"
               onChange={e =>
                   setVolume(Number(e.target.value))
               }
               defaultValue={volume}
               min="0"
               max="1"
               step="0.01"
               type="range"
        />
    );

}

export default AudioSlider;