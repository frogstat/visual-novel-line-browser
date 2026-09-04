type HeaderProps = {
    returnToGameMenu: () => void;
    gameName: string,
    languages: string[],
    setCurrentLanguage: (language: string) => void,
};

function Header({returnToGameMenu, gameName, languages, setCurrentLanguage}: HeaderProps) {
    return (
        <>
            <h1>{gameName}</h1>
            <button onClick={returnToGameMenu}>Return to menu</button>
            {languages.length > 1 && <p>Languages available: {languages.map(language =>
                <button onClick={() => setCurrentLanguage(language)} key={language}>{language.toUpperCase()}</button>
            )}</p>}
        </>
    );
}

export default Header;