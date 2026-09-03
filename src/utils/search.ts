import type {Line} from "./Line.ts";


export function getFilteredList(lines: Line[], searchTerm: string): Line[] {
    searchTerm = searchTerm.toLowerCase();

    let filteredLines: Line[];

    if (!searchTerm) {
        filteredLines = lines;
    } else {
        filteredLines = lines
            .filter((item: Line) =>
                item.speaker_jp?.toLowerCase().includes(searchTerm) ||
                item.text_jp?.toLowerCase().includes(searchTerm)
            );
    }
    return filteredLines.slice(0,100);
}