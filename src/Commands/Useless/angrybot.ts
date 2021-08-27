import { Command } from "../../Interfaces";
import { Formatters } from "discord.js";

export const command: Command = {
    name: "angrybot",
    description: `Permet de ${Formatters.strikethrough("Jouer à angrybird avec le bot")} voir le bot énervé`,
    aliases: [],
    syntax: "angrybot",
    categorie: "Useless",
    run: async(client, message, args) => {
    
        message.channel.send(">:0");
    
    }
}