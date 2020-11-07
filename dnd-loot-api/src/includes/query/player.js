const playerQuery = async (_, args, context) => {
  const statement = 'SELECT * from  player WHERE "id" = $1';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

module.exports = playerQuery;
