const en = {
    returnToMenu: "Return to Menu",
    voicedOnly: "Voiced Only",
    unvoicedOnly: "Unvoiced Only",
    voicedAny: "Any",
    favoritesOnly: "Favorites Only",
    searchQuote: "Search Quote...",
    noCharacters: "No Character",
};

const ja = {
    returnToMenu: "メニューに戻る",
    voicedOnly: "有声音のみ",
    unvoicedOnly: "無声音のみ",
    voicedAny: "すべて",
    favoritesOnly: "お気に入りのみ",
    searchQuote: "セリフを検索",
    noCharacters: "キャラクターなし",
};

export const uiLocale = {
    en,
    ja,
};

export function getUIName(language: string, uiItem: keyof typeof en) {
    if(!language){
        return uiLocale.ja[uiItem] ?? "";
    }
    if (!Object.keys(uiLocale).includes(language)) {
        return "";
    }

    return uiLocale[language as keyof typeof uiLocale][uiItem] ?? "";

}