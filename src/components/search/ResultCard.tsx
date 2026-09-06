import type {Match} from "../../utils/types.ts";

import {getFileWithoutExtension} from "../../utils/generalUtils.ts";

type ResultCardProp = {
    line: Match
    playVoice: (voiceFile: string | null | undefined) => void

}

function ResultCard({line, playVoice}: ResultCardProp) {

    return (
        <div className="result-card">
            <div className="result-card-header">
                <p>{line.speaker || ""}</p>
                <div className="result-card-actions">
                    {line.voiceFile && (
                        <>
                            <p>{getFileWithoutExtension(line.voiceFile)}</p>
                            <button onClick={() => playVoice(line.voiceFile)}>Play</button>
                        </>
                    )}
                    <button>Context</button>
                </div>
            </div>
            <div className="result-card-line">
                <p>{line.text  || ""}</p>
            </div>
        </div>
    );

    // return (
    //     <div className="result-card">
    //         <div className="result-card-quote">
    //             <p>{line.speaker || ""}</p>
    //             <p>{line.text  || "f"}</p>
    //         </div>
    //         <div className="result-card-actions">
    //             {line.voiceFile && (
    //                 <>
    //                     <p>{getFileWithoutExtension(line.voiceFile)}</p>
    //                     <button onClick={() => playVoice(line.voiceFile)}>Play</button>
    //                 </>
    //             )}
    //         </div>
    //     </div>
    // );


}

export default ResultCard