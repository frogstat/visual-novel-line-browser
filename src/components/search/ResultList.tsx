import type {Match} from "../../utils/types.ts";
import ResultCard from "./ResultCard.tsx";

type ResultListProps = {
    results: Match[] | null
    playVoice: (voiceFile: string | null | undefined) => void
}

const maxResults:number = 50;

function ResultList({results, playVoice}: ResultListProps) {

    function handleResultsDisplay() {
        if (results === null) {
            return <p>Loading...</p>
        }

        if (results.length === 0) {
            return <p>No results found.</p>
        }

        return (
            results.slice(0,maxResults).map((result: Match) =>
                <ResultCard
                    key={result.index}
                    line={result}
                    playVoice={playVoice}
                />
            ));
    }

    return (
        <>
            <p>Results: {results ? results.length : 0}</p>
            <div className="results-container">

                {handleResultsDisplay()}
            </div>
        </>
    );
}

export default ResultList