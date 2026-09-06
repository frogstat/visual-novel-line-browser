import LanguageSelector from "./LanguageSelector.tsx";
import AudioPlayer from "./audio/AudioPlayer.tsx";

type HeaderProps = {
    returnToGameMenu: () => void;
    gameName: string,
    languages: string[],
    currentLanguage: string
    setCurrentLanguage: (language: string) => void,
    musicProps: any,
    tracks: string[]
};

function Header({
                    returnToGameMenu,
                    gameName,
                    languages,
                    currentLanguage,
                    setCurrentLanguage,
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
                setVolume={musicProps.setVolume}
                isPlaying={musicProps.isPlaying}
                playNextTrack={musicProps.playNextTrack}
                togglePause={musicProps.togglePause}
            />
        )
    }


    return (
        <div className="header">
            <button onClick={returnToGameMenu}>← Return to menu</button>
            {resolveColumn()}
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