const results = [
    {
        key: 1,
        speaker: "Bob",
        text: "Hello World!"
    },
    {
        key: 2,
        speaker: "Jessie",
        text: "This is my text"
    }

]



function ResultList(){

    return(
        <div className="results-container" style={{border: "5px solid black"}}>
            {results.map(result=>
            <div style={{border: "1px solid red"}} className="result" key={result.key}>
                <p>{result.speaker}</p>
                <p>{result.text}</p>
            </div>
            )}
        </div>
    )
}

export default ResultList