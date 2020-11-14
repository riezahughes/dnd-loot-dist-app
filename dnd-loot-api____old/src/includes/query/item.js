const itemQuery = async (_, args, context) => {
  const statement = 'SELECT * from item WHERE "id" = $1';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemsQuery = async (_, args, context) => {
  const statement = 'SELECT * from item ORDER BY "id" DESC LIMIT 30';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows)
    .catch((err) => console.log(err));
};

module.exports = {
  itemQuery,
  itemsQuery,
};
