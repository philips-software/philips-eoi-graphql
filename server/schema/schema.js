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

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args){
                return _.find(Authors, {id: parent.authorId})
            }
         }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(Books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                // code to ger data from d/other source
                console.log(typeof(args.id));
                return _.find(Books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(Authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
	query: RootQuery
})
