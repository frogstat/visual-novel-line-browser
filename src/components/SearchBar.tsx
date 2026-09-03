import {useState} from "react";

function SearchBar(){

    const [searchText, setSearchText] = useState('');

    function handleSearchTextChange(event){
        const newSearch = event.target.value;
        setSearchText(newSearch);
    }

    return(
        <>
            <p>{searchText}</p>
            <input onChange={event => handleSearchTextChange(event)} type="text"/>
        </>


    )

}

export default SearchBar;