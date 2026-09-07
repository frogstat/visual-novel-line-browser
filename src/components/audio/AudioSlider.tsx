type AudioSliderProps = {
    volume: number,
    changeVolume(volume: number): void
}


function AudioSlider({volume, changeVolume}: AudioSliderProps) {

    return (
        <input className="volume-slider"
               onChange={e =>
                   changeVolume(Number(e.target.value))
               }
               value={volume}
               min="0"
               max="1"
               step="0.01"
               type="range"
        />
    );

}

export default AudioSlider;