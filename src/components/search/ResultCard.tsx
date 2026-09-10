import {getFileWithoutExtension} from "../../utils/generalUtils.ts";
import type {Line} from "../../utils/types.ts";

type ResultCardProp = {
    lineIndex: number;
    line: Line,
    playVoice: (voiceFile: string | null | undefined) => void,
    currentLanguage: string,
    showContextView: (originIndex: number) => void,
    favorites: number[],
    toggleFavorite: (favoriteIndex: number) => void,
}

function ResultCard({
                        lineIndex,
                        line,
                        playVoice,
                        currentLanguage,
                        showContextView,
                        favorites,
                        toggleFavorite
                    }: ResultCardProp,) {

    return (
        <div className="result-card">
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
                <button onClick={() => toggleFavorite(lineIndex)}>
                    {favorites.includes(lineIndex) ? "♥" : "♡"}
                </button>
                <button onClick={() => showContextView(lineIndex)}>Context</button>
            </div>
        </div>
    );

}

export default ResultCard