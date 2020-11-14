require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const resolvers = require('./includes/resolver');

const typeDefs = gql(fs.readFileSync(__dirname.concat('/includes/schema.graphql'), 'utf8'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
