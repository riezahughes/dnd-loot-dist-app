const partyQuery = require('./query/party');
const playerQuery = require('./query/player');
const lootQuery = require('./query/loot');
const itemQuery = require('./query/item');

const partyMutation = require('./mutations/party.js');
const playerMutation = require('./mutations/player');
const lootMutation = require('./mutations/loot');
const itemMutation = require('./mutations/item')

const resolver = {
  Query: {
    party: partyQuery.partyQuery,
    parties: partyQuery.partiesQuery,
    player: playerQuery.playerQuery,
    players: playerQuery.playersQuery,
    loot: lootQuery.lootQuery,
    lootpool: lootQuery.lootpoolQuery,
    item: itemQuery.itemQuery,
    items: itemQuery.itemsQuery,
  },
  Mutation: {
    createParty: partyMutation.partyCreate,
    updateParty: partyMutation.partyUpdate,
    deleteParty: partyMutation.partyDelete,
    createPlayer: playerMutation.playerCreate,
    updatePlayer: playerMutation.playerUpdate,
    deletePlayer: playerMutation.playerDelete,
    createLoot: lootMutation.lootCreate,
    updateLoot: lootMutation.lootUpdate,
    deleteLoot: lootMutation.lootDelete,
    addItem: itemMutation.itemCreate,
    updateItem: itemMutation.itemUpdate,
    deleteItem: itemMutation.itemDelete,
    claimItem: itemMutation.itemClaim,
    unclaimItem: itemMutation.itemUnclaim
  },
};

module.exports = resolver;
