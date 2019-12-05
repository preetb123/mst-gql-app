const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    id: "2",
    title: "Jurassic Park",
    author: "Michael Crichton"
  },
  {
    id: "3",
    title: "Shattered Pieces",
    author: "Cairon Holt"
  },
  {
    id: "4",
    title: "A Guide to Courteous Thievery ",
    author: "Pascal Gale"
  },
  {
    id: "5",
    title: "The Stars Tonight",
    author: "Martyna House"
  },
  {
    id: "6",
    title: "Angels and Demons",
    author: "Eamonn Pennington"
  },
  {
    id: "7",
    title: "Love and Hate",
    author: "Clarissa Mcfarland"
  },
  {
    id: "8",
    title: "War and Peace ",
    author: "Regina Kearns"
  },
  {
    id: "9",
    title: "Till Death Do Us Part ",
    author: "Sorcha Sandoval"
  },
  {
    id: "10",
    title: "Double Jeopardy ",
    author: "Allen Grey"
  },
  {
    id: "11",
    title: "Liberty or Death ",
    author: "Maaria Xiong"
  }
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
