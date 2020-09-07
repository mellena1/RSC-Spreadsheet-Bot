import {Client} from 'discord.js';

const client = new Client();

client.on('ready', () => {
    console.log('Discord bot is connected and listening');
});

client.on('message', (message) => {
    if (message.author.bot) {
        return;
    }
    console.log(`Message received: ${message.author.bot} ${message.content}`);
    message.channel.send("Hi");
});

client.login(process.env.DISCORD_BOT_TOKEN);
