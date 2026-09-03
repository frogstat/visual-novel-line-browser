type ResultListProps = {
    lines: []
}

function ResultList({lines}:ResultListProps){

    if(lines){
        return(
            <div className="results-container" style={{border: "5px solid black"}}>
                {lines.map(result=>
                    <div style={{border: "1px solid red"}} className="result" key={lines.indexOf(result)}>
                        <p>{result.speaker_jp}</p>
                        <p>{result.text_jp}</p>
                    </div>
                ).splice(0,100)}
            </div>
        )
    } else {
        return (
            <p>loading</p>
        );
    }
}

export default ResultList