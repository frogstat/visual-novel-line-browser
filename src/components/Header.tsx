import LanguageSelector from "./LanguageSelector.tsx";
import AudioPlayer from "./audio/AudioPlayer.tsx";
import {getUIName} from "../utils/uiLocale.ts";

type HeaderProps = {
    returnToGameMenu: () => void;
    gameName: string,
    languages: string[],
    currentLanguage: string
    changeLanguage: (language: string) => void,
    musicProps: any,
    tracks: string[]
};

function Header({
                    returnToGameMenu,
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
            <button className="return-button" onClick={returnToGameMenu}>← {getUIName(currentLanguage, "returnToMenu")}</button>
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