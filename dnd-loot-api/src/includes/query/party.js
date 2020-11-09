const partyQuery = async (_, args, context) => {
  const statement = {
    text: `
    SELECT
      party.* AS party,
      json_agg(DISTINCT player) AS player,
      json_agg(DISTINCT loot) AS loot
    FROM party
    INNER JOIN player ON party."id" = player."party_id"
    LEFT JOIN loot ON party."id" = loot."party_id"
    WHERE party."id" = $1
    GROUP BY party.id`,
    values: [args.id],
  };

  return context.pg.query(statement).then((res) => {
    console.log(res.rows[0], { depth: null });
    // console.dir(res.rows[0].player, { depth: null })
    return ({
      id: res.rows[0].id,
      name: res.rows[0].name,
      createdAt: res.rows[0].createdAt,
      players: res.rows[0].player,
      loot: res.rows[0].loot
    });
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
