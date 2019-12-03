const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  },
  {
    title: "Shattered Pieces",
    author: "Cairon Holt"
  },
  {
    title: "A Guide to Courteous Thievery ",
    author: "Pascal Gale"
  },
  {
    title: "The Stars Tonight",
    author: "Martyna House"
  },
  {
    title: "Angels and Demons",
    author: "Eamonn Pennington"
  },
  {
    title: "Love and Hate",
    author: "Clarissa Mcfarland"
  },
  {
    title: "War and Peace ",
    author: "Regina Kearns"
  },
  {
    title: "Till Death Do Us Part ",
    author: "Sorcha Sandoval"
  },
  {
    title: "Double Jeopardy ",
    author: "Allen Grey"
  },
  {
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
