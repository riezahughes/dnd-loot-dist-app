const partyCreate = async (_, args, context) => {
  const statement = 'INSERT INTO party("name", "createdAt") VALUES ($1, NOW()) RETURNING "name", "id", "createdAt"';
  const values = [args.name];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const partyUpdate = async (_, args, context) => {
  const statement = 'UPDATE party SET "name" = $1 WHERE "id" = $2 RETURNING "name", "id", "createdAt"';
  const values = [args.name, args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const partyDelete = async (_, args, context) => {
  const statement = 'DELETE FROM party WHERE "id" = $1 RETURNING "name", "id", "createdAt" ';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

module.exports = {
  partyCreate,
  partyUpdate,
  partyDelete,
};
