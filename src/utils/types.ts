export type Line = {
    [key: `text_${string}`]: string | null | undefined;
    [key: `speaker_${string}`]: string | null | undefined;
    voice_file: string | null | undefined;
};

export type Character = {
    [key: `name_${string}`]: string | null | undefined;
};

export type Characters = Record<string, Character>;

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