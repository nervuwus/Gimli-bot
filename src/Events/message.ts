import { Event, Command } from "../Interfaces";
import { Message } from "discord.js";

export const event: Event = {
    name: 'message',
    run: (client, message: Message) => {
        if (message.author.bot || message.channel.type === "dm" || !message.guild || !message.content.startsWith(client.config.prefix)) return;
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (!command) return;
        const cmd = client.commands.get(command) || client.aliases.get(command);
        if (cmd) (cmd as Command).run(client, message, args);
    }
}