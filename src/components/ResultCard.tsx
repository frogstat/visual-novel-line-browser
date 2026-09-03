type ResultCardProp = {
    speaker?: string,
    text?: string,
    voice_file?: string,
    playVoice: any

}

function ResultCard({speaker, text, voice_file, playVoice}: ResultCardProp) {

    function formatVoiceFile() {
        if (!voice_file) {
            return
        }
        return voice_file.substring(0, voice_file.lastIndexOf("."));
    }

    return (
        <div style={{border: "1px solid red"}} className="result">
            {speaker && <p>{speaker}</p>}
            {text && <p>{text}</p>}
            {voice_file && (
                <>
                    <p>{formatVoiceFile()}</p>
                    <button onClick={() => playVoice(voice_file)}>Play</button>
                </>
            )}

        </div>
    );


}

export default ResultCard