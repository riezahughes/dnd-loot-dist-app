const resolver = {
  Query: {
    party: async (_, args, context) => {
      const statement = `SELECT * from  party WHERE "id" = '${args.id}'`;
      return context.pg.query(statement).then((res) => res.rows[0])
        .catch((err) => console.log(err))
    },
  },
  Mutation: {
    createParty: async (_, args, context) => {
      const statement = `INSERT INTO party("name", "createdAt") VALUES ('${args.name}', NOW()) RETURNING "name", "id", "createdAt"`;
      return context.pg.query(statement).then((res) => res.rows[0])
        .catch((err) => console.log(err))
    },

    updateParty: async (_, args, context) => {
      const statement = `UPDATE party SET "name" = '${args.name}' WHERE "id" = '${args.id}' RETURNING "name", "id", "createdAt"`;
      return context.pg.query(statement).then((res) => res.rows[0])
        .catch((err) => console.log(err));
    },

    deleteParty: async (_, args, context) => {
      const statement = `DELETE FROM party WHERE "id" = '${args.id}' RETURNING "name", "id", "createdAt" `;
      return context.pg.query(statement).then((res) => res.rows[0])
        .catch((err) => console.log(err));
    }
  }
}

module.exports = resolver;