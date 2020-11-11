const partyQuery = async (_, args, context) => {
  const statement = {
    text: `
    select
    json_build_object(
            'id', u.id,
            'name', u.name,
            'players', json_build_object(
                    'id', ur.id,
                    'name', ur.name,
                    'party_id', u.id,
                    'discord_id', ur.discord_id
            ),
            'loot', json_build_object(
                    'id', d.id,
                    'name', d.name,
                    'party_id', u.id,
                    'items', json_build_object(
                      'id', e.id,
                      'name', e.name,
                      'claimed_by', e.claimed_by,
                      'loot_id', d.id
                    )
            )
            
  )
  from party u
  inner join player ur on ur.party_id = u.id
  left join loot d on d.party_id = u.id
  full join item e on e.loot_id = d.id
  WHERE u.id = $1
  `,
    values: [args.id],
  };

  return context.pg.query(statement).then((res) => {
    console.log(res.rows[0].json_build_object, { depth: null });
    return res.rows[0].json_build_object;
  })
    .catch((err) => console.log(err));
};

const partiesQuery = async (_, args, context) => {
  const returnArray = async (parties) => {
    const partyArray = [];
    for (let x = 0; x < parties.rows.length; x++) {
      // console.log(res.rows);
      const playerStatement = {
        text: 'SELECT * FROM player WHERE "party_id" = $1 ORDER BY "id" DESC LIMIT 30',
        values: [parties.rows[x].id],
      };
      // get players via party_id
      await context.pg.query(playerStatement).then((result) => {
        // console.log(result.rows);
        partyArray.push({
          id: parties.rows[x].id,
          name: parties.rows[x].name,
          createdAt: parties.rows[x].createdAt,
          players: result.rows,
        });
      });

      if (x + 1 === parties.rows.length) {
        console.log(partyArray);
        return partyArray;
      }
    }
  };

  const statement = {
    text: 'SELECT * from party ORDER BY "id" DESC LIMIT 30',
  };

  const finalArray = [];
  // get all rows for party.
  return context.pg.query(statement).then(async (res) =>
    // for each party
    await returnArray(res)).then((res) => res).catch((err) => console.log(err));
};

module.exports = {
  partyQuery,
  partiesQuery,
};
