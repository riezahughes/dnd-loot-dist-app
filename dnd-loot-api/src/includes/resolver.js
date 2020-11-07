const resolver = {
  Query: {
    party: () => books,
  },
  Mutation: {
    createParty: async (_, args, context) => {
      const insertParty = await context.pg.query(`INSERT INTO party("name", "createdAt") VALUES ('${args.name}', NOW()) RETURNING *`,
        (err, res) => {
          return res.rows[0]
        });
    }
  }
}

module.exports = resolver;