export type Line = {
    voice_file?: string | null;
    speaker?: string | null;
    text?: string | null;
    [key: `speaker_${string}`]: string | null | undefined;
    [key: `text_${string}`]: string | null | undefined;
};

export type Character = {
    [key: `name_${string}`]: string | null | undefined;
}

export type Characters = Record<string, Character | string>;

export type ContextView = {
    originIndex: number,
    centerIndex: number,
    results: number[]
}

export type Game = {
    folderName: string,
    title: string
}

export type SelectedCharacter = {
    id: string,
    names: string[]
}

export type VoiceFilter = "any" | "voiced" | "unvoiced"

export type Metadata = {
    languages?: string[],
    hasCharacterCode?: boolean
}