import LanguageSelector from "./LanguageSelector.tsx";
import AudioPlayer from "./audio/AudioPlayer.tsx";

type HeaderProps = {
    returnToGameMenu: () => void;
    gameName: string,
    languages: string[],
    currentLanguage: string
    setCurrentLanguage: (language: string) => void,
    musicProps: any

};

function Header({returnToGameMenu, gameName, languages, currentLanguage, setCurrentLanguage, musicProps}: HeaderProps) {
    return (
        <div className="header">
            <button onClick={returnToGameMenu}>← Return to menu</button>
            <AudioPlayer
                currentTrack={musicProps.currentTrack}
                volume={musicProps.volume}
                setVolume={musicProps.setVolume}
                isPlaying={musicProps.isPlaying}
                playNextTrack={musicProps.playNextTrack}
                togglePause={musicProps.togglePause}
            />
            <p>{gameName}</p>
            {languages.length > 1 &&
                <div className="language-selector-wrapper">
                    <LanguageSelector
                        languages={languages}
                        currentLanguage={currentLanguage}
                        setCurrentLanguage={setCurrentLanguage}
                    />
                </div>}
        </div>
    );
}

export default Header;