export type Line = {
    [key: `text_${string}`]: string | null | undefined;
    [key: `speaker_${string}`]: string | null | undefined;
    voice_file: string | null | undefined;
};

export type Match = {
    index: number;
    speaker: string | null;
    text: string | null;
    voiceFile: string | null;
}

export type Languages = string[];