const partyQuery = async (_, args, context) => {
  const statement = {
    text: 'SELECT * FROM party INNER JOIN player ON party."id" = player."party_id" WHERE party.id = $1 ORDER BY party.id DESC',
    values: [args.id],
    rowMode: 'array',
  };

  return context.pg.query(statement).then((res) => {
    const breakdown = res.rows[0].slice(3, res.rows[0].length);

    const player = [];

    for (let x = 0; x < breakdown.length; x += 5) {
      const pushArray = {
        id: breakdown[x],
        name: breakdown[x + 1],
        discord_id: breakdown[x + 2],
        party_id: breakdown[x + 3],
        createdAt: breakdown[x + 4],
      };

      player.push(pushArray);
    }

    return {
      id: res.rows[0][0],
      name: res.rows[0][1],
      createdAt: res.rows[0][2],
      players: player,
    };
  })
    .catch((err) => console.log(err));
};

const partiesQuery = async (_, args, context) => {
  const statement = {
    text: 'SELECT * from party INNER JOIN player ON party."id" = player."party_id" ORDER BY party."id" DESC LIMIT 30',
    rowMode: 'array',
  };

  return context.pg.query(statement).then((res) => {
    returnArray = [];

    for (party in res.rows) {

    }

    console.log(res.rows);
    return res.rows;
  })
    .catch((err) => console.log(err));
};

module.exports = {
  partyQuery,
  partiesQuery,
};
