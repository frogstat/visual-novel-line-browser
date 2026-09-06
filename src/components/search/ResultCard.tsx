import type {Match} from "../../utils/types.ts";

import {getFileWithoutExtension} from "../../utils/generalUtils.ts";

type ResultCardProp = {
    line: Match
    playVoice: (voiceFile: string | null | undefined) => void

}

function ResultCard({line, playVoice}: ResultCardProp) {

    return (
        <div className="result-card">
            <div className="result-card-quote">
                {line.speaker && <p>{line.speaker}</p>}
                {line.text && <p>{line.text}</p>}
            </div>
            <div className="result-card-actions">
                {line.voiceFile && (
                    <>
                        <p>{getFileWithoutExtension(line.voiceFile)}</p>
                        <button onClick={() => playVoice(line.voiceFile)}>Play</button>
                    </>
                )}
            </div>
        </div>
    );


}

export default ResultCard