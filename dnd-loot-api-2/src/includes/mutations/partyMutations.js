const partyCreate = async (_, args, context) => {
  return context.prisma.party.create({
    data: {
      party_name: args.name,
    },
  })
};

const partyUpdate = async (_, args, context) => {
  return context.prisma.race.update({
    data: {
      party_name: args.name,
      players: args.players,
      loot: args.loot
    },
    where: {
      id: args.id,
    },
  })
};

const partyDelete = async (_, args, context) => {
  return context.prisma.party.delete({
    where: {
      id: args.id,
    },
  })
};

module.exports = {
  partyCreate,
  partyUpdate,
  partyDelete,
}; 
 