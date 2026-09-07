import {getFileWithoutExtension} from "../../utils/generalUtils.ts";
import type {Line} from "../../utils/types.ts";

type ContextCardProps = {
    line: Line
    isCurrent: boolean,
    currentLanguage: string,
    playVoice: (voiceFile: string | null | undefined) => void,
    originLineRef: any
}

function ContextCard({line, isCurrent, currentLanguage, playVoice, originLineRef}: ContextCardProps) {

    return (
        <div
            ref={isCurrent ? originLineRef : null}
            className={"result-card" + (isCurrent ? " context-line-current" : "")}>
            <div className="result-card-left">
                <p>{line[`speaker_${currentLanguage}`] || ""}</p>
                <p>{line[`text_${currentLanguage}`] || ""}</p>
            </div>

            <div className="result-card-actions">
                {line.voice_file && (
                    <>
                        <p>{getFileWithoutExtension(line.voice_file)}</p>
                        <button onClick={() => playVoice(line.voice_file)}>Play</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ContextCard;