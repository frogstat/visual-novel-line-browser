import LanguageSelector from "./LanguageSelector.tsx";
import AudioPlayer from "./audio/AudioPlayer.tsx";
import {getUIName} from "../utils/uiLocale.ts";
import {Link} from "react-router-dom";

type HeaderProps = {
    gameName: string,
    languages: string[],
    currentLanguage: string
    changeLanguage: (language: string) => void,
    musicProps: any,
    tracks: string[]
};

function Header({
                    gameName,
                    languages,
                    currentLanguage,
                    changeLanguage,
                    musicProps,
                    tracks
                }: HeaderProps) {

    function resolveColumn() {
        if (!tracks || tracks.length === 0) {
            return <div/>
        }

        return (
            <AudioPlayer
                currentTrack={musicProps.currentTrack}
                volume={musicProps.volume}
                changeVolume={musicProps.changeVolume}
                isPlaying={musicProps.isPlaying}
                playNextTrack={musicProps.playNextTrack}
                togglePause={musicProps.togglePause}
            />
        )
    }


    return (
        <div className="header">
            <Link to="/"><button className="return-button">← {getUIName(currentLanguage, "returnToMenu")}</button></Link>
            {resolveColumn()}
            <p className="game-title">{gameName}</p>
            {languages.length > 1 &&
                <div className="language-selector-wrapper">
                    <LanguageSelector
                        languages={languages}
                        currentLanguage={currentLanguage}
                        changeLanguage={changeLanguage}
                    />
                </div>}
        </div>
    );
}

export default Header;