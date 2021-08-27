import { Command } from "../../Interfaces";

export const command: Command = {
    name: "sadbot",
    description: "Vous fera voir Gimli tout triste ;-;",
    aliases: [],
    syntax: "sadbot",
    categorie: "Useless",
    run: async(client, message, args) => {
    
        message.channel.send("TwT");
    
    }
}