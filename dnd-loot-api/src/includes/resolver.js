const books = {
  book: 'yes',
};

const resolver = {
  Query: {
    party: () => books,
  },
  Mutations: {
      party: (args) => 
  }
};

module.exports = resolver;
