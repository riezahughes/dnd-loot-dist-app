const lootpoolCreate = async (_, args, context) => {
  return context.prisma.lootpool.create({
    data: {
      name: args.name,
    },
  })
};

const lootpoolUpdate = async (_, args, context) => {
  return context.prisma.race.update({
    data: {
      name: args.name,
      players: args.players,
      loot: args.loot
    },
    where: {
      id: args.id,
    },
  })
};

const lootpoolDelete = async (_, args, context) => {
  return context.prisma.lootpool.delete({
    where: {
      id: args.id,
    },
  })
};


module.exports = {
  lootpoolCreate,
  lootpoolUpdate,
  lootpoolDelete,
};
