import type {Match} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";

type ResultListProps = {
    results: Match[] | null
    playVoice: (voiceFile: string | null | undefined) => void
}

const maxResults: number = 50;

function ResultList({results, playVoice}: ResultListProps) {

    function getResultList() {
        if (results === null) {
            return <p>Loading...</p>
        }

        if (results.length === 0) {
            return <p>No results found.</p>
        }

        return (
            results.slice(0, maxResults).map((result: Match) =>
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
                <p>Results: {results ? results.length : 0}</p>
                <div className="result-list-info-buttons">
                    <button>Previous</button>
                    <button>Next</button>
                </div>
            </div>
            {getResultList()}
        </div>

    );
}

export default ResultList