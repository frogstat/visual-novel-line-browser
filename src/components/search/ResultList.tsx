import type {Line} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";
import {usePagination} from "../../hooks/usePagination.ts";

type ResultListProps = {
    resultIndices: number[] | null,
    lines: Line[] | null,
    currentLanguage: string,
    playVoice: (voiceFile: string | null | undefined) => void,
    error: string | null,
    showContextView: (originIndex: number) => void,
    favorites: number[],
    toggleFavorite: (favoriteIndex: number) => void,
}


function ResultList({
                        resultIndices,
                        lines,
                        currentLanguage,
                        playVoice,
                        error,
                        showContextView,
                        favorites,
                        toggleFavorite
                    }: ResultListProps,) {

    const {
        goToNextPage,
        goToPreviousPage,
        currentPage,
        totalPages,
        currentPageStartIndex,
        currentPageEndIndex,
    } = usePagination(resultIndices?.length ?? 0);

    function getResultList() {
        if (error) {
            return <p style={{color: "yellow"}}>{error}</p>
        }

        if (resultIndices === null || lines === null) {
            return <p>Loading...</p>
        }

        if (resultIndices.length === 0 || lines.length === 0) {
            return <p>No results found.</p>
        }

        return (
            <div
                className={"result-list " + (!resultIndices || resultIndices.length === 0 ? "result-list-closed" : "")}>
                <div className="result-list-content">
                    {resultIndices.slice(currentPageStartIndex, currentPageEndIndex).map((resultIndex: number) =>
                        <ResultCard
                            key={resultIndex}
                            lineIndex={resultIndex}
                            line={lines[resultIndex]}
                            currentLanguage={currentLanguage}
                            playVoice={playVoice}
                            showContextView={showContextView}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                            isCurrent={null}
                            originLineRef={null}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="results-container">
            <div className="result-list-info">
                <p>{(resultIndices?.length ?? 0) === 0 ? 0 : currentPageStartIndex + 1} - {currentPageEndIndex} of {resultIndices?.length ?? 0}</p>
                <div className="result-list-info-buttons">
                    <button onClick={goToPreviousPage}>←</button>
                    <p>page {currentPage} of {totalPages}</p>
                    <button onClick={goToNextPage}>→</button>
                </div>
            </div>

            {getResultList()}

        </div>

    );
}

export default ResultList