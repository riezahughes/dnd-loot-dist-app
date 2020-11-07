require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const { Pool } = require('pg');
const resolvers = require('./includes/resolver');

const pool = new Pool();

const typeDefs = gql(fs.readFileSync(__dirname.concat('/includes/schema.graphql'), 'utf8'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    pg: pool,
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
