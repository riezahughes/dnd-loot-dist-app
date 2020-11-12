const partyMutations = require('./mutations/partyMutations');
const playerMutations = require('./mutations/playerMutations');
const lootMutations = require('./mutations/lootpoolMutations');
const itemMutations = require('./mutations/itemMutations');


const resolver = {
  Query: {
    party: (_, args, context) => context.prisma.party.findOne({ where: { id: args.id },  include: { lootpools: true, players: true, items: true }  }),
    parties: (_, args, context) => context.prisma.party.findMany({include: { lootpools: true, players: true, items: true }}),
    player: (_, args, context) => context.prisma.player.findOne({ where: { id: args.id } , include: { party: true, lootpools: true } }),
    players: (_, args, context) => context.prisma.player.findMany({include: { party: true }}),
    lootpool: (_, args, context) => context.prisma.lootPool.findOne({ where: { id: args.id }, include: { party: true, items: true } }),
    lootpools: (_, args, context) => context.prisma.lootPool.findMany({ include: { party: true, items: true } }),
    item: (_, args, context) => context.prisma.item.findOne({ where: { id: args.id }, include: { lootpool: true } }),
    items: (_, args, context) => context.prisma.item.findMany({ include: { lootpool: true }}),
  },
  Mutation: {
    createParty: partyMutations.partyCreate,
    updateParty: partyMutations.partyUpdate,
    deleteParty: partyMutations.partyDelete,
    createPlayer: playerMutations.playerCreate,
    updatePlayer: playerMutations.playerUpdate,
    deletePlayer: playerMutations.playerDelete,
    createLoot: lootMutations.lootpoolCreate,
    updateLoot: lootMutations.lootpoolUpdate,
    deleteLoot: lootMutations.lootpoolDelete,
    addItem: itemMutations.itemCreate,
    updateItem: itemMutations.itemUpdate,
    deleteItem: itemMutations.itemDelete,
    claimItem: itemMutations.itemClaim,
    unclaimItem: itemMutations.itemUnclaim,
  },
};

module.exports = resolver;
