type LanguageSelectorProps={
    languages: string[],
    currentLanguage: string,
    changeLanguage: (language: string) => void,
}

function LanguageSelector({languages, currentLanguage, changeLanguage}: LanguageSelectorProps) {



    return (
        <div className="language-selector-container">
            {languages.map(language => (
                <div
                    key={language}
                    className={`language-tag ${language === currentLanguage ? "language-tag-active" : ""}`}
                    onClick={() => changeLanguage(language)}
                >
                    <span>{language.toUpperCase()}</span>
                </div>
            ))}
        </div>
    );




}

export default LanguageSelector;