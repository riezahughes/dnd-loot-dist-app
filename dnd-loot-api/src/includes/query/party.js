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
  };

  return context.pg.query(statement).then((res) => {

    // get all rows for party.
    // for each party
    // get players via party_id
    // create array return with players and party details
    console.log("initial rows");
    console.log(res.rows);
    let finalReturn = [];

    res.rows.forEach((rowOfParty, index) => {
      let playerArray = []

      const playerStatement = {
        text: `SELECT * FROM player WHERE "party_id" = $1 ORDER BY "id" DESC LIMIT 30`,
        values: [rowOfParty.id]
      };
      context.pg.query(playerStatement).then((res) => {
        console.log("Players:");
        console.log(res.rowLength);
        res.rows.forEach((player) => {
          playerArray.push(player);
        })
        console.log(playerArray);
        finalReturn.push({
          id: rowOfParty.id,
          name: rowOfParty.name,
          createdAt: rowOfParty.createdAt,
          players: playerArray,
        })
      }).then((res) => { return finalReturn });
    });
    // returnArray = [];
    // console.log("Return Statement");
    // console.log(res.rows);
    // let currentPartyId;
    // res.rows.forEach((rowOfParty, index) => {

    //   if (index === 0) {
    //     currentPartyId = party[0];
    //   }

    //   if (previousPartyId !== currentPartyId) {
    //     currentPartyId = party[0];
    //     playerArray.push(pushArray);
    //   }

    //   if (res.rows.length === )


    //     console.log("Party Break");
    //   console.log(party);

    //   playerArray = [];

    //   const breakdown = party.slice(3, party.length);

    //   for (let x = 0; x < breakdown.length; x += 5) {
    //     const pushArray = {
    //       id: breakdown[x],
    //       name: breakdown[x + 1],
    //       discord_id: breakdown[x + 2],
    //       party_id: breakdown[x + 3],
    //       createdAt: breakdown[x + 4],
    //     };
    //   }
    // });
    // console.log("Final Returned Array");
    // console.log(returnArray);
    // return returnArray;
  })
    .catch((err) => console.log(err));
};

module.exports = {
  partyQuery,
  partiesQuery,
};
