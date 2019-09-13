import { gql } from "apollo-boost";
export const fetchTableQuery = gql`
  {
    books {
      id
      title
      price
      publication_date
      person_id
      genre_id
    }
  }
`;
export const insertEntryBooksTableQuery = gql`
  mutation {
    insert_books(
      objects: [
        {
          title: "Bio Diversity"
          price: 1001
          genre_id: 3
          person_id: 6
          publication_date: "2014-09-09"
        }
      ]
    ) {
      affected_rows
      returning {
        id
        title
        price
      }
    }
  }
`;
export const updateEntryBooksTable = gql`
  mutation {
    update_books(
      where: { genre: {id: {_eq: 3}} }
      _set: { title: "Marvel Evolution", genre_id: 4 }
    ) {
      returning {
        id
        publication_date
        title
      }
    }
  }
`;

export const deleteEntryBooksTable = gql`
  mutation {
    delete_books(where: { price: { _gte: 1000 } }) {
      returning {
        id
        title
      }
    }
  }
`;
export const upsertEntryBooksTable = gql`
  mutation {
    insert_books(
      objects: [
        {
          id: 45
          person_id: 4
          title: "Digital Electronics1234"
          price: 473
          genre_id: 3
          publication_date: "2012-04-24"
        }
      ]
      on_conflict: {
        constraint: books_pkey
        update_columns: [price, title, genre_id]
      }
    ) {
      returning {
        id
        title
      }
    }
  }
`;

export const booksCountVsGenere = gql`
  {
    genres {
      id
      type
      books_aggregate(where: { price: { _gte: 100 } }) {
        aggregate {
          count
        }
      }
    }
  }
`;
export const booksCountVsPerson = gql`
  {
    persons {
      id
      name
      phone
      city
      books_aggregate(where: { title: { _ilike: "%s%" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;
export const fetchGraphdataQueries = gql`
  {
    genres {
      id
      type
      books_aggregate(where: { price: { _gte: 100 } }) {
        aggregate {
          count
        }
      }
    }

    persons {
      id
      name
      phone
      city
      books_aggregate(where: { title: { _ilike: "%s%" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;
export const maxPriceSubcriptionQuery = gql`
  subscription get_books {
    books(order_by: { price: desc }, limit: 1) {
      id
      price
      title
    }
  }
`;
