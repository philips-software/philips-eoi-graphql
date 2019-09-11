import { gql } from "apollo-boost";

export const dummyQuery = gql`
  {
    dummy{
      id
    }
  }
`;
export const fetchTableQuery = dummyQuery
export const insertEntryTableQuery = dummyQuery
export const booksCountVsGenere = dummyQuery
export const booksCountVsPerson = dummyQuery
export const fetchGraphdataQueries = dummyQuery