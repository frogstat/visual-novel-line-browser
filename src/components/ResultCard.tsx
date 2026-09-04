import type {Match} from "../utils/types.ts";

type ResultCardProp = {
    line: Match
    playVoice: (voiceFile: string | null | undefined) => void

}

function ResultCard({line, playVoice}: ResultCardProp) {

    function formatVoiceFile(voiceFile: string) {
        const extensionIndex = voiceFile.lastIndexOf(".");

        if (extensionIndex === -1) {
            return voiceFile;
        }

        return voiceFile.substring(0, extensionIndex);
    }

    return (
        <div style={{border: "1px solid red"}} className="result">
            {line.speaker && <p>{line.speaker}</p>}
            {line.text && <p>{line.text}</p>}
            {line.voiceFile && (
                <>
                    <p>{formatVoiceFile(line.voiceFile)}</p>
                    <button onClick={() => playVoice(line.voiceFile)}>Play</button>
                </>
            )}

        </div>
    );


}

export default ResultCard