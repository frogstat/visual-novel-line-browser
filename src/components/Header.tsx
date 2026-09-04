type HeaderProps = {
    gameName: string,
    currentLanguage: string,
    languages: string[],
    cycleLanguage?: () => void
};

function Header({gameName, currentLanguage, languages, cycleLanguage}: HeaderProps) {
    return (
        <>
            <h1>{gameName}</h1>
            <p>Languages available: {languages.map((language: string) =>
                <span key={language}>{language}, </span>
            )}</p>
            <p>Current language: {currentLanguage}</p>
            {languages.length > 1 && <button onClick={cycleLanguage}>Toggle language</button>}
        </>
    );
}

export default Header;