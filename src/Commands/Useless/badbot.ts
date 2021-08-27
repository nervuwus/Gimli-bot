import { Command } from "../../Interfaces";

export const command: Command = {
    name: "badbot",
    description: "Une commande pour dire au bot qu'il est pas gentil...Mais faut pas faire ça c'est méchant",
    aliases: [],
    syntax: "badbot",
    categorie: "Useless",
    run: async(client, message, args) => {
    
        message.channel.send("Mais je te permet pas ! >:0");
    
    }
}

//inférence Bayesienne 