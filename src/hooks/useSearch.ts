//TODO: Eventually move other search functions here
import {useState} from "react";
import type {VoiceFilter} from "../utils/types.ts";



export function useSearch() {
    const [voiceFilter, setVoiceFilter] = useState<VoiceFilter>("any");



    return {
        voiceFilter,
        setVoiceFilter,
    }
}