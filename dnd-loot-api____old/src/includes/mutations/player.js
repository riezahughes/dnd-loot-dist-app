const playerCreate = async (_, args, context) => {
  const statement = 'INSERT INTO player("name", "discord_id", "party_id", "createdAt") VALUES ($1, $2, $3, NOW()) RETURNING "name", "id", "party_id", "discord_id", "createdAt"';
  const values = [args.name, args.discord_id, args.party_id];
  return context.pg.query(statement, values).then((res) => {
    console.log(res.rows[0]);
    return res.rows[0];
  })
    .catch((err) => console.log(err));
};

const playerUpdate = async (_, args, context) => {
  let statement = 'UPDATE player SET ';
  let count = 1;

  if (args.name) {
    statement += `"name" = $${count} `;
    count++;
  }
  if (args.discord_id) {
    statement += `, "discord_id" = $${count} `;
    count++;
  }

  statement += `WHERE "id" = $${count} AND "party_id" = $${count + 1} RETURNING "name", "id", "createdAt"`;
  const values = [args.name, args.discord_id, args.id, args.party_id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const playerDelete = async (_, args, context) => {
  const statement = 'DELETE FROM player WHERE "id" = $1 RETURNING "name", "id", "createdAt" ';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

module.exports = {
  playerCreate,
  playerUpdate,
  playerDelete,
};
