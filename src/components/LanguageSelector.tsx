type LanguageSelectorProps={
    languages: string[],
    currentLanguage: string,
    setCurrentLanguage: (language: string) => void,
}

function LanguageSelector({languages, currentLanguage, setCurrentLanguage}: LanguageSelectorProps) {



    return (
        <div className="language-selector-container">
            {languages.map(language => (
                <div
                    key={language}
                    className={`language-tag ${language === currentLanguage ? "language-tag-active" : ""}`}
                    onClick={() => setCurrentLanguage(language)}
                >
                    <span>{language.toUpperCase()}</span>
                </div>
            ))}
        </div>
    );




}

export default LanguageSelector;