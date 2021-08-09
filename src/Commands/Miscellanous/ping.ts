import { Command } from "../../Interfaces";

export const command: Command = {
    name: "ping",
    aliases: [],
    syntax: "gi!ping",
    run: async(client, message, args) => {
        message.channel.send(`${client.ws.ping}ms`)
    }
}