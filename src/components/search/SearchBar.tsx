type SearchBarProps = {
    setQuery: (searchText: string) => void;
};

function SearchBar({setQuery}: SearchBarProps) {

    return (
        <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
        />
    )

}

export default SearchBar;