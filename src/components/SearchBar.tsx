function SearchBar(props:any) {

    const setSearchText:(searchText:string) => void = props.setSearchText;

    return(
        <>
            <input onChange={(e) => setSearchText(e.target.value)} type="text"/>
        </>


    )

}

export default SearchBar;