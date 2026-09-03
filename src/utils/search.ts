const before = [
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

function getFilteredList (searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();

    const filteredList = before
        .filter((item) =>
            item.speaker.toLowerCase().includes(searchTerm) ||
            item.text.toLowerCase().includes(searchTerm)
        )

    return filteredList;
}

const newList = getFilteredList("bob")


for (let item of newList){
    console.log(item)
}