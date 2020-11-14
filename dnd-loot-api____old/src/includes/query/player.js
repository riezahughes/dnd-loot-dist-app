const playerQuery = async (_, args, context) => {
  const query = {
    text: 'SELECT * FROM player INNER JOIN party ON player."party_id" = party."id" WHERE player.id = $1 ORDER BY player.id DESC',
    values: [args.id],
    rowMode: 'array',
  };

  return context.pg.query(query).then((res) => {
    console.log(res.rowLength);
    console.log(res.rows);
    return res.rows[0];
  });
};

const playersQuery = async (_, args, context) => {
  const statement = 'SELECT * FROM player INNER JOIN party ON player."party_id" = party."id" ORDER BY player.id DESC LIMIT 30';

  return context.pg.query(statement).then((res) => {
    console.log(res.rowLength);
    console.log(res.rows);
    return res.rows;
  })
    .catch((err) => console.log(err));
};

module.exports = {
  playerQuery,
  playersQuery,
};
