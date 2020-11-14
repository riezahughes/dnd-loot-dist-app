// you were chipping away at this. You need to create the items and attach them
// to the pool. You also need to sort out currency and quantity of each
// item.

const itemCreate = async (_, args, context) => {
  const statement = 'INSERT INTO item("name", "loot_id", "claimed_by", "createdAt") VALUES($1, $2, null, NOW()) RETURNING "id", "name", "claimed_by", "loot_id"';
  const values = [args.name, args.loot_id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemUpdate = async (_, args, context) => {
  const statement = 'UPDATE item SET "name" = $1 WHERE "id" = $2 RETURNING "name", "id", "loot_id", "claimed_by", "createdAt"';
  const values = [args.name, args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemDelete = async (_, args, context) => {
  const statement = 'DELETE FROM item WHERE "id" = $1 RETURNING "name", "id", "loot_id", "claimed_by", "createdAt"';
  const values = [args.id];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemClaim = async (_, args, context) => {
  const statement = 'UPDATE item SET "claimed_by" = $1 WHERE "id" = $2 RETURNING "name", "id", "loot_id", "claimed_by", "createdAt"';
  const values = [args.id, args.claimed_by];

  return context.pg.query(statement, values).then((res) => res.rows[0])
    .catch((err) => console.log(err));
};

const itemUnclaim = async (_, args, context) => {
  const statement = 'UPDATE item SET "claimed_by" = NULL WHERE "id" = $2 RETURNING "name", "id", "loot_id", "claimed_by", "createdAt"';
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
