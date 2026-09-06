import type {Line} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";
import {usePagination} from "../../utils/usePagination.ts";

type ResultListProps = {
    resultIndices: number[] | null,
    lines:Line[] | null,
    currentLanguage:string,
    playVoice: (voiceFile: string | null | undefined) => void
}


function ResultList({resultIndices, lines, currentLanguage, playVoice}: ResultListProps) {

    const {
        goToNextPage,
        goToPreviousPage,
        currentPage,
        totalPages,
        currentPageStartIndex,
        currentPageEndIndex
    } = usePagination(resultIndices?.length ?? 0);

    function getResultList() {
        if (resultIndices === null || lines === null) {
            return <p>Loading...</p>
        }

        if (resultIndices.length === 0 || lines.length === 0) {
            return <p>No results found.</p>
        }

        return (
            resultIndices.slice(currentPageStartIndex, currentPageEndIndex).map((resultIndex:number) =>
                <ResultCard
                    key={resultIndex}
                    line={lines[resultIndex]}
                    currentLanguage={currentLanguage}
                    playVoice={playVoice}
                />
            ));
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
            <div className={"result-list " + (!resultIndices || resultIndices.length === 0 ? "result-list-closed" : "")}>
                <div className="result-list-content">
                    {getResultList()}
                </div>
            </div>
        </div>

    );
}

export default ResultList