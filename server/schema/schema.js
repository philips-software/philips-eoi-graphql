const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
 } = graphql;

//dummy Data
const Books = [
    {id: "1", name: "Books1", genre: "genere1", authorId: "1"},
    {id: "2", name: "Books2", genre: "genere2", authorId: "2"},
    {id: "3", name: "Books3", genre: "genere3", authorId: "3"},
    {id: "4", name: "Books4", genre: "genere4", authorId: "3"},
    {id: "5", name: "Books5", genre: "genere5", authorId: "2"},
    {id: "6", name: "Books6", genre: "genere6", authorId: "3"},
]

const Authors = [
    {id: "1", name: "Author1", age: 21},
    {id: "2", name: "Author2", age: 22},
    {id: "3", name: "Author3", age: 23}
]

module.exports = new GraphQLSchema({
})
