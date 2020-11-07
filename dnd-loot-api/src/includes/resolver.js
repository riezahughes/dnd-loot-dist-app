const partyQuery = require('./query/party');
const playerQuery = require('./query/player');
const lootQuery = require('./query/loot');
const itemQuery = require('./query/item');

const partyMutation = require('./mutations/party.js');

const resolver = {
  Query: {
    party: partyQuery.partyQuery,
    parties: partyQuery.partiesQuery,
    player: playerQuery,
    loot: lootQuery,
    item: itemQuery.itemQuery,
    items: itemQuery.itemsQuery,
  },
  Mutation: {
    createParty: partyMutation.partyCreate,
    updateParty: partyMutation.partyUpdate,
    deleteParty: partyMutation.partyDelete,
  },
};

module.exports = resolver;
