import type {Languages} from "../utils/types.ts";

export function useCycleLanguage(currentLanguage: string, setCurrentLanguage: (newLanguage: string) => void, languages: Languages){
    function cycleLanguage() {
        if (!languages) {
            return;
        }
        const currentIndex = languages.indexOf(currentLanguage);

        if (currentIndex >= languages.length - 1) {
            setCurrentLanguage(languages[0]);
        } else {
            setCurrentLanguage(languages[currentIndex + 1]);
        }
    }
    return cycleLanguage;
}
