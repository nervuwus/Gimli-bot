import { Command } from "../../Interfaces";

export const command: Command = {
    name: "goodbot",
    description: "Une commande pour dire au bot qu'il est super.",
    aliases: [],
    syntax: "goodbot",
    categorie: "Useless",
    run: async(client, message, args) => {
    
        message.channel.send("Merci ! [^-^]");
    
    }
}