const itemCreate = async (_, args, context) => {
  return context.prisma.item.create({
    data: {
      name: args.name,
    },
  })
};

const itemUpdate = async (_, args, context) => {
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

const itemDelete = async (_, args, context) => {
  return context.prisma.item.delete({
    where: {
      id: args.id,
    },
  })
};

const itemClaim = async (_, args, context) => {
  return context.prisma.item.update({
    data: {
      claimed_by: args.claimed_by
    },
    where: {
      id: args.id,
    },
  })
};

const itemUnclaim = async (_, args, context) => {
  return context.prisma.item.update({
    data: {
      claimed_by: null
    },
    where: {
      id: args.id,
    },
  })
};


module.exports = {
  itemCreate,
  itemUpdate,
  itemDelete,
  itemClaim,
  itemUnclaim
};
