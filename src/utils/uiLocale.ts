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

const ch = {
    returnToMenu: "返回菜单",
    voicedOnly: "仅显示有声台词",
    unvoicedOnly: "仅显示无声台词",
    voicedAny: "全部",
    favoritesOnly: "仅显示收藏",
    searchQuote: "搜索台词...",
    noCharacters: "无角色",
};

export const uiLocale = {
    en,
    ja,
    ch
};

export function getUIName(language: string, uiItem: keyof typeof en) {
    if(!language || !Object.keys(uiLocale).includes(language)){
        return uiLocale.en[uiItem] ?? "";
    }

    return uiLocale[language as keyof typeof uiLocale][uiItem] ?? "";

}