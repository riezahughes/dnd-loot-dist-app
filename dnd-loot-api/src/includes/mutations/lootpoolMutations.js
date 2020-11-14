const lootpoolCreate = async (_, args, context) => {
  return context.prisma.lootPool.create({
    data: {
      lootpool_name: args.name,
      party: {
        connect: { id: args.party_id }
      },
      items: args.items,
    },
    include: { party: true, items: true }
  })
};

const lootpoolUpdate = async (_, args, context) => {
  return context.prisma.lootPool.update({
    data: {
      lootpool_name: args.name,
      players: args.players,
      items: args.items
    },
    where: {
      id: args.id,
    },
    include: { party: true, items: true }
  })
};

const lootpoolDelete = async (_, args, context) => {
  return context.prisma.lootPool.delete({
    where: {
      id: args.id,
    },
    include: { party: true, items: true }
  })
};


module.exports = {
  lootpoolCreate,
  lootpoolUpdate,
  lootpoolDelete,
};
