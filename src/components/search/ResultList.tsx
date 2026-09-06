import type {Match} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";

type ResultListProps = {
    results: Match[] | null
    playVoice: (voiceFile: string | null | undefined) => void
}

const maxResults: number = 10;

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
                <p>
                    {results ? `fake - fake of i don't know what I'm doing results` : ""}
                </p>
                <div className="result-list-info-buttons">
                    <button>Previous</button>
                    {results &&
                        <p>page fake of {Math.floor(results.length / maxResults + 1)}</p>}
                    <button>Next</button>
                </div>
            </div>
            {getResultList()}
        </div>

    );
}

export default ResultList