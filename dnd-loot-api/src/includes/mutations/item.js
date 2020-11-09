// you were chipping away at this. You need to create the items and attach them 
// to the pool. You also need to sort out currency and quantity of each 
// item.

const itemCreate = async (_, args, context) => {
  const statement = 'INSERT INTO loot("name", "loot_id", "createdAt") VALUES ($1, $2, NOW()) RETURNING "id", "name", "party_id", "createdAt"';
  const values = [args.name, args.party_id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemUpdate = async (_, args, context) => {
  const statement = 'UPDATE loot SET "name" = $1 WHERE "id" = $2 RETURNING "name", "id", "createdAt"';
  const values = [args.name, args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemDelete = async (_, args, context) => {
  const statement = 'DELETE FROM loot WHERE "id" = $1 RETURNING "name", "id", "createdAt" ';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemClaim = async (_, args, context) => {
  const statement = 'DELETE FROM loot WHERE "id" = $1 RETURNING "name", "id", "createdAt" ';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemUnclaim = async (_, args, context) => {
  const statement = 'DELETE FROM loot WHERE "id" = $1 RETURNING "name", "id", "createdAt" ';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

module.exports = {
  itemCreate,
  itemUpdate,
  itemDelete,
  itemClaim,
  itemUnclaim,
};
