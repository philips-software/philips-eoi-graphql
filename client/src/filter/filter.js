export const filterBooksCountVsGenere = (result) => {
    const labels = result.data['genres'].map(g => g.type);
    const values = result.data['genres'].map(g => g.books_aggregate.aggregate.count);
    return {
        labels,
        values
    }
}
export const filterPersonsCountVsGenere = (result) => {
    const labels = result.data['persons'].map(g => g.name);
    const values = result.data['persons'].map(g => g.books_aggregate.aggregate.count);
    return {
        labels,
        values
    }
}

export const filterGraphQueriesData = (result) => {
    return [
        { ...filterBooksCountVsGenere(result), xlabel: "Genres", title: "Number of books per Genre"},
        { ...filterPersonsCountVsGenere(result), xlabel: "Persons",  title: "Number of books per Person"}
    ]
}