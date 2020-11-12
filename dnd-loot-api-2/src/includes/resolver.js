const partyMutations = require('./mutations/partyMutations');
const playerMutations = require('./mutations/playerMutations');
const lootMutations = require('./mutations/lootpoolMutations');
const itemMutations = require('./mutations/itemMutations');


const resolver = {
  Query: {
    party: (_, args, context) => context.prisma.party.findOne({ where: { id: args.id },  include: { loot: true, players: true }  }),
    parties: (_, args, context) => context.prisma.party.findMany(),
    player: (_, args, context) => context.prisma.player.findOne({ where: { id: args.id } , include: { party: true } }),
    players: (_, args, context) => context.prisma.player.findMany(),
    lootpool: (_, args, context) => context.prisma.lootpool.findOne({ where: { id: args.id } }),
    lootpools: (_, args, context) => context.prisma.lootpool.findMany(),
    item: (_, args, context) => context.prisma.item.findOne({ where: { id: args.id } }),
    items: (_, args, context) => context.prisma.item.findMany(),
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
