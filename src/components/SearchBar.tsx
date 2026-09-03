type SearchBarProps = {
    setSearchText: (searchText: string) => void;
};

function SearchBar({setSearchText}: SearchBarProps) {

    return (
        <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
        />
    )

}

export default SearchBar;