const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const resolvers = require('./includes/resolver');

const typeDefs = gql(fs.readFileSync(__dirname.concat('/includes/schema.graphql'), 'utf8'));

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
