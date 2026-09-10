import type {Line} from "../../utils/types.ts";
import type {ContextView} from "../../utils/types.ts";
import LanguageSelector from "../LanguageSelector.tsx";
import ResultCard from "./ResultCard.tsx";

type ContextPanelProps = {
    lines: Line[],
    contextView: ContextView
    closeContext: () => void,
    navigateContextView: (delta: number) => void,
    languages: string[],
    currentLanguage: string
    setCurrentLanguage: (language: string) => void,
    playVoice: (voiceFile: string | null | undefined) => void,
    originLineRef: any,
    contextMenuRef: any,
    favorites: number[],
    toggleFavorite: (favoriteIndex: number) => void,
}


function ContextPanel({
                          lines,
                          contextView,
                          closeContext,
                          navigateContextView,
                          setCurrentLanguage,
                          languages,
                          currentLanguage,
                          playVoice,
                          originLineRef,
                          contextMenuRef,
                          favorites,
                          toggleFavorite,
                      }: ContextPanelProps) {


    return (
        <div onClick={closeContext} className="context-overlay">
            <div onClick={e => e.stopPropagation()} className="context-panel">

                <div className="context-panel-header">

                    <button
                        className="context-nav-button"
                        disabled={contextView.results.includes(0)}
                        onClick={() => navigateContextView(-99)}>
                        ←
                    </button>

                    <div className="context-panel-header-right">
                        {languages && languages.length > 1 && (
                            <LanguageSelector
                                currentLanguage={currentLanguage}
                                languages={languages}
                                setCurrentLanguage={setCurrentLanguage}
                            />
                        )}

                        <button
                            className="context-nav-button"
                            onClick={() => navigateContextView(99)}
                            disabled={contextView.results.includes(lines.length - 1)}>
                            →
                        </button>

                        <button
                            className="context-close"
                            onClick={closeContext}
                        >X
                        </button>
                    </div>

                </div>

                <div className="context-panel-lines" ref={contextMenuRef}>

                    {lines.length && contextView && contextView.results.map((currentIndex: number) =>
                        <ResultCard
                            key={currentIndex}
                            lineIndex={currentIndex}
                            line={lines[currentIndex]}
                            isCurrent={currentIndex === contextView.originIndex}
                            currentLanguage={currentLanguage}
                            playVoice={playVoice}
                            originLineRef={originLineRef}
                            showContextView={null}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                    )}
                </div>
            </div>
        </div>
    )


}

export default ContextPanel;