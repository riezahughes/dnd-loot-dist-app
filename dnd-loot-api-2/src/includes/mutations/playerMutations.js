const playerCreate = async (_, args, context) => {
  return context.prisma.player.create({
    data: {
      player_name: args.name,
      discord_id: args.discord_id,
      party: {
        connect: { id: args.party }
      },
    },
    include: { party: true }
  })
};

//add party via foreign key correctly then you're golden.

const playerUpdate = async (_, args, context) => {
  return context.prisma.player.update({
    data: { 
      player_name: args.name,
      discord_id: args.discord_id,
    },
    where: {
      id: args.id,
    },
    include: { party: true }
  })  
};

const playerDelete = async (_, args, context) => {
  return context.prisma.player.delete({
    where: {
      id: args.id,
    },
  })
};


module.exports = {
  playerCreate,
  playerUpdate,
  playerDelete,
};
