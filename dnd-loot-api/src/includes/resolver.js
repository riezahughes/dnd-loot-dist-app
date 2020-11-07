const partyQuery = require('./query/party');
const playerQuery = require('./query/player');
const lootQuery = require('./query/loot');
const itemQuery = require('./query/item');

const partyMutation = require('./mutations/party.js');

const resolver = {
  Query: {
    party: partyQuery,
    player: playerQuery,
    loot: lootQuery,
    item: itemQuery,
  },
  Mutation: {
    createParty: partyMutation.partyCreate,
    updateParty: partyMutation.partyUpdate,
    deleteParty: partyMutation.partyDelete,
  },
};

module.exports = resolver;
