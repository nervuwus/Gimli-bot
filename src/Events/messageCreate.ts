import { Event, Command } from "../Interfaces";
import { Message, Formatters } from "discord.js";
import GuildInfo from "../Database/Models/GuildInfo";

export const event: Event = {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        const serverPrefix = await GuildInfo.findOne({ guildId: message.guild.id })
        if (message.author.bot || message.channel.type === "DM" || !message.guild) return;
        const args = message.content.slice(serverPrefix.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (!command) return;
        const cmd = client.commands.get(command) || client.aliases.get(command);
        if (cmd) (cmd as Command).run(client, message, args);
        if (message.content.startsWith('<@!873999791430967296>')) message.channel.send(`Je suis bien là Gamin ! Si tu veux de l'aide utilise la commande : ${Formatters.inlineCode("help")}.\n sinon je te rappel que sur **ce serveur** mon prefix est: ${serverPrefix.prefix}`);
    }
}