import type {Match} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";
import {usePagination} from "../../utils/usePagination.ts";

type ResultListProps = {
    results: Match[] | null
    playVoice: (voiceFile: string | null | undefined) => void
}


function ResultList({results, playVoice}: ResultListProps) {

    const {
        goToNextPage,
        goToPreviousPage,
        currentPage,
        totalPages,
        currentPageStartIndex,
        currentPageEndIndex
    } = usePagination(results?.length ?? 0);

    function getResultList() {
        if (results === null) {
            return <p>Loading...</p>
        }

        if (results.length === 0) {
            return <p>No results found.</p>
        }

        return (
            results.slice(currentPageStartIndex, currentPageEndIndex).map((result: Match) =>
                <ResultCard
                    key={result.index}
                    line={result}
                    playVoice={playVoice}
                />
            ));
    }

    return (
        <div className="results-container">
            <div className="result-list-info">
                <p>{(results?.length ?? 0) === 0 ? 0 : currentPageStartIndex + 1} - {currentPageEndIndex} of {results?.length ?? 0}</p>
                <div className="result-list-info-buttons">
                    <button onClick={goToPreviousPage}>Previous</button>
                    <p>page {currentPage} of {totalPages}</p>
                    <button onClick={goToNextPage}>Next</button>
                </div>
            </div>
            <div className={"result-list " + (!results || results.length === 0 ? "result-list-closed" : "")}>
                <div className="result-list-content">
                    {getResultList()}
                </div>
            </div>
        </div>

    );
}

export default ResultList