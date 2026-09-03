type ResultCardProp = {
    speaker?: string,
    text?: string,
    voice_file?: string,
    playVoice: (voiceFile: string | undefined) => void

}

function ResultCard({speaker, text, voice_file, playVoice}: ResultCardProp) {

    function formatVoiceFile(voiceFile: string) {
        const extensionIndex = voiceFile.lastIndexOf(".");

        if (extensionIndex === -1) {
            return voiceFile;
        }

        return voiceFile.substring(0, extensionIndex);
    }

    return (
        <div style={{border: "1px solid red"}} className="result">
            {speaker && <p>{speaker}</p>}
            {text && <p>{text}</p>}
            {voice_file && (
                <>
                    <p>{formatVoiceFile(voice_file)}</p>
                    <button onClick={() => playVoice(voice_file)}>Play</button>
                </>
            )}

        </div>
    );


}

export default ResultCard