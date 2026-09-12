import {getFileWithoutExtension} from "../../utils/generalUtils.ts";
import type {Line} from "../../utils/types.ts";
import playIcon from "../../assets/play-icon.svg"
import searchIcon from "../../assets/search-icon.svg"
import favoriteIcon from "../../assets/favorited.svg"
import notFavoritedIcon from "../../assets/not-favorited.svg"


type LineCardProps = {
    // Shared props
    lineIndex: number;
    line: Line,
    playVoice: (voiceFile: string | null | undefined) => void,
    currentLanguage: string,
    favorites: number[],
    toggleFavorite: (favoriteIndex: number) => void,
    voiceBasePath: string,

    // Result Card only
    showContextView: ((originIndex: number) => void) | null;

    // Context Card only
    isCurrent: boolean | null;
    originLineRef: any | null;
}

function ResultCard({
                        line,
                        playVoice,
                        currentLanguage,
                        favorites,
                        toggleFavorite,
                        lineIndex,
                        showContextView,
                        isCurrent,
                        originLineRef,
                        voiceBasePath

                    }: LineCardProps) {

    function isFavorited() {
        return favorites.includes(lineIndex)
    }

    return (
        <div className={`result-card ${isCurrent && originLineRef ? "context-card-current" : ""}`}
             ref={isCurrent ? originLineRef : null}>
            <div className="result-card-left">
                {line[`speaker_${currentLanguage}`] && (<p>{line[`speaker_${currentLanguage}`]}</p>)}
                <p>{line[`text_${currentLanguage}`] || ""}</p>
            </div>

            <div className="result-card-right">
                <div className="result-card-actions">
                    {line.voice_file && (
                        <>
                            <a className="voice-file-link"
                               href={`${voiceBasePath}/${line.voice_file}`}
                               download={line.voice_file.replaceAll("/", "_")}>
                                {getFileWithoutExtension(line.voice_file)}
                            </a>
                            <button className="card-button" onClick={() => playVoice(line.voice_file)}>
                                <img src={playIcon} alt="Play"/>
                            </button>
                        </>
                    )}

                    <button className="card-button" onClick={() => toggleFavorite(lineIndex)}>
                        <img
                            alt={isFavorited() ? "favorite" : "unfavorite"}
                            src={isFavorited() ? favoriteIcon : notFavoritedIcon}/>
                    </button>

                    {showContextView && (
                        <button className="card-button" onClick={() => showContextView(lineIndex)}>
                            <img src={searchIcon} alt="Search"/>
                        </button>
                    )}


                </div>
                <span className="result-index">{lineIndex + 1}</span>
            </div>

        </div>
    );
}

export default ResultCard