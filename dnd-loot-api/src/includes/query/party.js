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

  const returnArray = async (parties) => {
    let partyArray = [];
    for (let x = 0; x < parties.rows.length; x++) {
      // console.log(res.rows);
      const playerStatement = {
        text: `SELECT * FROM player WHERE "party_id" = $1 ORDER BY "id" DESC LIMIT 30`,
        values: [parties.rows[x].id]
      };
      // get players via party_id
      await context.pg.query(playerStatement).then((result) => {
        // console.log(result.rows);
        partyArray.push({
          id: parties.rows[x].id,
          name: parties.rows[x].name,
          createdAt: parties.rows[x].createdAt,
          players: result.rows,
        })
      });

      if (x + 1 === parties.rows.length) {
        console.log(partyArray);
        return partyArray;
      }

    }
  }

  const statement = {
    text: 'SELECT * from party ORDER BY "id" DESC LIMIT 30',
  };

  let finalArray = [];
  // get all rows for party.
  return context.pg.query(statement).then(async (res) => {
    // for each party
    return await returnArray(res);

  }).then((res) => { return res }).catch((err) => console.log(err));
};

module.exports = {
  partyQuery,
  partiesQuery,
};
