const books = {
  book: 'yes',
};

const resolver = {
  Query: {
    party: () => books,
  },
  Mutation: {
    createParty: (_, args, context) => ({
      id: 1,
      name: args.name,
    }),
  },
};

module.exports = resolver;
