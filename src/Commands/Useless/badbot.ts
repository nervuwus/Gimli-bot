import { Command } from "../../Interfaces";

export const command: Command = {
    categorie: "Useless",
    data: {
        name: "badbot",
        type: 1,
        description: "Si tu es mécontant utilise cette commande !",
    },
    async run(client, interaction) {
    
        interaction.reply("Mais je te permet pas ! >:0");
    
    }
}

//inférence Bayesienne 
// Je sais pas pourquoi j'ai mis inférence Bayesienne au dessus O_O