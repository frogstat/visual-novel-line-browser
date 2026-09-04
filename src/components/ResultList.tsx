import type {Match} from "../utils/types.ts";
import ResultCard from "./ResultCard.tsx";

type ResultListProps = {
    results: Match[] | null
    playVoice: (voiceFile: string | null | undefined) => void
}

function ResultList({results, playVoice}: ResultListProps) {

    function handleResultsDisplay() {
        if (results === null) {
            return <p>Loading...</p>
        }

        if (results.length === 0) {
            return <p>No results found.</p>
        }

        return (
            results.map((result: Match) =>
                <ResultCard
                    key={result.index}
                    line={result}
                    playVoice={playVoice}
                />
            ));
    }

    return (
        <div className="results-container" style={{border: "5px solid black"}}>
            {handleResultsDisplay()}
        </div>
    );
}

export default ResultList