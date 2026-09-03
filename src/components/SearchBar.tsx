function SearchBar(props:any) {

    const searchText:string = props.searchText;
    const setSearchText:(searchText:string) => void = props.setSearchText;

    return(
        <>
            <p>{searchText}</p>
            <input onChange={(e) => setSearchText(e.target.value)} type="text"/>
        </>


    )

}

export default SearchBar;