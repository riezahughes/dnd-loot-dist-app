const resolver = {
  Query: {
    party: async (_, args, context) => {

      const statement = `SELECT * from  party WHERE "id" = $1`;
      const values = [args.id];

      return context.pg.query(statement, values).then((res) => res.rows[0])
        .catch((err) => console.log(err))
    },
  },
  Mutation: {
    createParty: async (_, args, context) => {

      const statement = `INSERT INTO party("name", "createdAt") VALUES ($1, NOW()) RETURNING "name", "id", "createdAt"`;
      const values = [args.name]

      return context.pg.query(statement, values).then((res) => res.rows[0])
        .catch((err) => console.log(err))
    },

    updateParty: async (_, args, context) => {
      const statement = `UPDATE party SET "name" = $1 WHERE "id" = $2 RETURNING "name", "id", "createdAt"`;
      const values = [args.name, args.id]

      return context.pg.query(statement, values).then((res) => res.rows[0])
        .catch((err) => console.log(err));
    },

    deleteParty: async (_, args, context) => {

      const statement = `DELETE FROM party WHERE "id" = $1 RETURNING "name", "id", "createdAt" `;
      const values = [args.id]

      return context.pg.query(statement, values).then((res) => res.rows[0])
        .catch((err) => console.log(err));
    }
  }
}

module.exports = resolver;