const lootQuery = async (_, args, context) => {
  const statement = 'SELECT * from  loot WHERE "id" = $1';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const lootpoolQuery = async (_, args, context) => {
  const statement = 'SELECT * from  loot WHERE "id" = $1';

  return context.pg.query(statement).then((res) => res.rows)
    .catch((err) => console.log(err));
};

module.exports = {
  lootQuery,
  lootpoolQuery,
};
