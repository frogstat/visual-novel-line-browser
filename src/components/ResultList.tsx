import type {Line} from "../utils/Line.ts";
import ResultCard from "./ResultCard.tsx";

type ResultListProps = {
    results:Line[] | null
    playVoice:(voiceFile: string | undefined) => void
}

function ResultList({results, playVoice}: ResultListProps) {

    function handleResultsDisplay(){
    if (results === null){
        return <p>Loading...</p>
    }

    if (results.length === 0){
        return <p>No results found.</p>
    }

    return (
        results.map((result: Line, index:number) =>
            <ResultCard
                key={index}
                speaker={result.speaker_jp}
                text={result.text_jp}
                   voice_file={result.voice_file}
                playVoice={playVoice}
            />
        ))
    }

    return(
        <div className="results-container" style={{border: "5px solid black"}}>
            {handleResultsDisplay()}
        </div>
    );
}

export default ResultList