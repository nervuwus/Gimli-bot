import { Command } from "../../Interfaces";

export const command: Command = {
    name: "happybot",
    description: "L'unique commande permettant de voir à quel point le bot est heureux.",
    aliases: [],
    syntax: "happybot",
    categorie: "Useless",
    run: async(client, message, args) => {
    
        message.channel.send(":D");
    
    }
}