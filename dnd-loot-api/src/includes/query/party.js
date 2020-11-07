const partyQuery = async (_, args, context) => {
  const statement = 'SELECT * from  party WHERE "id" = $1';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const partiesQuery = async (_, args, context) => {
  const statement = 'SELECT * from party ORDER BY "id" DESC LIMIT 30';

  return context.pg.query(statement).then((res) => res.rows)
    .catch((err) => console.log(err));
};

module.exports = {
  partyQuery,
  partiesQuery,
};
