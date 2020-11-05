/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('party', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('player', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    discord_id: { type: 'varchar(100)', notNull: true },
    party_id: {
      type: 'integer',
      notNull: true,
      references: '"party"',
      onDelete: 'cascade',
    },
  });

  pgm.createTable('loot', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    party_id: {
      type: 'integer',
      notNull: true,
      references: '"party"',
      onDelete: 'cascade',
    },
  });

  pgm.createTable('item', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    claimed_by: {
      type: 'integer',
      references: '"player"',
      referencesConstraintName: 'player character',
    },
    loot_id: {
      type: 'integer',
      notNull: true,
      references: '"loot"',
      onDelete: 'cascade',
      referencesConstraintName: 'loot pool',
    },
  });

  pgm.createIndex('loot', 'party_id');
  pgm.createIndex('item', 'claimed_by');
  pgm.createIndex('loot', 'id');
};

exports.down = (pgm) => {
  pgm.dropTable('item');
  pgm.dropTable('loot');
  pgm.dropTable('player');
  pgm.dropTable('party');
};
