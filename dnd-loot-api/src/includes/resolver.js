const resolver = {
  Query: {
    party: () => books,
  },
  Mutation: {
    createParty: async (_, args, context) =>
      context.pg.query(`INSERT INTO party("name", "createdAt") VALUES ('${args.name}', NOW()) RETURNING *`).then((res) => res.rows[0])
        .catch((err) => console.log(err))
  }
}

module.exports = resolver;