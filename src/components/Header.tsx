import LanguageSelector from "./LanguageSelector.tsx";

type HeaderProps = {
    returnToGameMenu: () => void;
    gameName: string,
    languages: string[],
    currentLanguage: string
    setCurrentLanguage: (language: string) => void,
};

function Header({returnToGameMenu, gameName, languages, currentLanguage, setCurrentLanguage}: HeaderProps) {
    return (
        <div className="header">
            <button onClick={returnToGameMenu}>← Return to menu</button>
            <div/>
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