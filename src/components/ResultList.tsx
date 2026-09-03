import type {Line} from "../utils/Line.ts";

type ResultListProps = {
    results:Line[] | null
}

function ResultList({results}: ResultListProps) {

    if (results) {
        return (
            <div className="results-container" style={{border: "5px solid black"}}>
                {results.map((result: Line, index:number) =>
                    <div style={{border: "1px solid red"}} className="result" key={index}>
                        <p>{result.speaker_jp}</p>
                        <p>{result.text_jp}</p>
                    </div>
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