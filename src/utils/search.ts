import type {Line} from "./Line.ts";


export function getFilteredList (lines:Line[], searchTerm: string): Line[] {
    searchTerm = searchTerm.toLowerCase();
    if(!searchTerm){
        return lines;
    }

    const filteredList:Line[] = lines
        .filter((item:Line) =>
            item.speaker_jp?.toLowerCase().includes(searchTerm) ||
            item.text_jp?.toLowerCase().includes(searchTerm)
        )

    return filteredList;
}