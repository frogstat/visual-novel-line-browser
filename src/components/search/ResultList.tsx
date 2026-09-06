import type {Match} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";
import {useEffect, useState} from "react";

type ResultListProps = {
    results: Match[] | null
    playVoice: (voiceFile: string | null | undefined) => void
}

const maxResults: number = 10;

function ResultList({results, playVoice}: ResultListProps) {

    const [currentStartIndex, setCurrentStartIndex] = useState(0);

    useEffect(() => {
        setCurrentStartIndex(0);
    }, [results]);

    function nextPage() {
        if (!results) {
            return;
        }
        if (currentStartIndex + maxResults > results.length - 1) {
            return;
        }
        setCurrentStartIndex(prevState => prevState + maxResults)
    }

    function previousPage() {
        if (currentStartIndex === 0) {
            return;
        }
        setCurrentStartIndex(prevState => prevState - maxResults)
    }

    function getResultList() {
        if (results === null) {
            return <p>Loading...</p>
        }

        if (results.length === 0) {
            return <p>No results found.</p>
        }

        return (
            results.slice(currentStartIndex, currentStartIndex + maxResults).map((result: Match) =>
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
                <p>
                    {results ? `${currentStartIndex + 1} - ${currentStartIndex + maxResults} of ${results.length + 1} results` : ""}
                </p>
                <div className="result-list-info-buttons">
                    <button onClick={previousPage}>Previous</button>
                    {results &&
                        <p>page {currentStartIndex / maxResults + 1} of {Math.floor(results.length / maxResults + 1)}</p>}
                    <button onClick={nextPage}>Next</button>
                </div>
            </div>
            {getResultList()}
        </div>

    );
}

export default ResultList