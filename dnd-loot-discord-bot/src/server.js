require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const breakMessage = message.split(' ');
  const command = breakMessage[0].toLowerString();

  // people in discord should be able to
  // create and lead a party
  // set people to join said party
  // set a lootpool of items
  // be able to choose and deselect said items

  // the bot should be able to
  // relay the current party and loot appropriately
  // update via the api correctly
  // keep the player in the know.

  if (command === '$$createparty') {
    console.log('Party made');
  }

  if (command === '$$createloot') {
    console.log('Loot Created');
  }
  if (command === '$$addplayer') {
    console.log('player added');
  }
  if (command === '$$removeplayer') {
    console.log('player removed');
  }
  if (command === '$$claim') {
    console.log('loot claimed by player');
  }
  if (command === '$$unclaim') {
    console.log('loot unclaimed');
  }
});

client.login(process.env.DISCORD_TOKEN);
