import type {Line} from "../utils/Line.ts";
import ResultCard from "./ResultCard.tsx";

type ResultListProps = {
    results:Line[] | null
    playVoice:any
}

function ResultList({results, playVoice}: ResultListProps) {

    if (results) {
        return (
            <div className="results-container" style={{border: "5px solid black"}}>
                {results.map((result: Line, index:number) =>
                    <ResultCard
                        key={index}
                        speaker={result.speaker_jp}
                        text={result.text_jp}
                        voice_file={result.voice_file}
                        playVoice={playVoice}
                    />
                )}
            </div>
        )
    } else {
        return (
            <p>loading</p>
        );
    }
}

export default ResultList