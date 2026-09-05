type SearchBarProps = {
    setQuery: (searchText: string) => void;
};

function SearchBar({setQuery}: SearchBarProps) {

    return (
        <input
            className="search-query-bar"
            type="text"
            placeholder="Search quote..."
            onChange={(e) => setQuery(e.target.value)}
        />
    )

}

export default SearchBar;