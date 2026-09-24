import {getFileWithoutExtension} from "../../utils/generalUtils.ts";
import type {Line} from "../../utils/types.ts";
import playIcon from "../../assets/play-icon.svg"
import searchIcon from "../../assets/search-icon.svg"
import favoriteIcon from "../../assets/favorited.svg"
import notFavoritedIcon from "../../assets/not-favorited.svg"
import {getLineValue} from "../../utils/lineParser.ts";
import SvgIcon from "../SvgIcon.tsx";


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
    showContextView: ((originIndex: number) => void) | null,
    setSelectedCharacter: ((name: string) => void) | null,

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
                        voiceBasePath,
                        setSelectedCharacter

                    }: LineCardProps) {

    function isFavorited() {
        return favorites.includes(lineIndex)
    }

    function handleSpeakerClick(): void {
        if (!setSelectedCharacter) {
            return;
        }
        const name = getLineValue(line, "speaker", currentLanguage)
        setSelectedCharacter(name)
    }

    return (
        <div className={`result-card ${isCurrent && originLineRef ? "context-card-current" : ""}`}
             ref={isCurrent ? originLineRef : null}>
            <div className="result-card-left">

                {getLineValue(line, "speaker", currentLanguage) && (
                    <p className="result-card-speaker" style={setSelectedCharacter !== null ? {cursor: "pointer"} : {}}
                       onClick={handleSpeakerClick}>
                        {getLineValue(line, "speaker", currentLanguage)}
                    </p>
                )}

                <p>{getLineValue(line, "text", currentLanguage)}</p>

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
                                <SvgIcon label={"play"} icon={playIcon}/>
                            </button>
                        </>
                    )}

                    <button className="card-button" onClick={() => toggleFavorite(lineIndex)}>
                        <SvgIcon
                            label={isFavorited() ? "favorite" : "unfavorite"}
                            icon={isFavorited() ? favoriteIcon : notFavoritedIcon}
                        />
                    </button>

                    {showContextView && (
                        <button className="card-button" onClick={() => showContextView(lineIndex)}>
                            <SvgIcon
                                label={"search"}
                                icon={searchIcon}
                            />
                        </button>
                    )}


                </div>
                <span className="result-index">{lineIndex + 1}</span>
            </div>

        </div>
    );
}

export default ResultCard