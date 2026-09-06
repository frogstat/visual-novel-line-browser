import {getFileWithoutExtension} from "../../utils/generalUtils.ts";
import type {Line} from "../../utils/types.ts";

type ResultCardProp = {
    line: Line,
    playVoice: (voiceFile: string | null | undefined) => void,
    currentLanguage: string
}

function ResultCard({line, playVoice, currentLanguage}: ResultCardProp) {



    return (
        <div className="result-card">
            <div className="result-card-header">
                <p>{line[`speaker_${currentLanguage}`] || ""}</p>
                <div className="result-card-actions">
                    {line.voice_file && (
                        <>
                            <p>{getFileWithoutExtension(line.voice_file)}</p>
                            <button onClick={() => playVoice(line.voice_file)}>Play</button>
                        </>
                    )}
                    <button>Context</button>
                </div>
            </div>
            <div className="result-card-line">
                <p>{line[`text_${currentLanguage}`] || ""}</p>
            </div>
        </div>
    );

}

export default ResultCard