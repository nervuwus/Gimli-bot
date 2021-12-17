import { Command } from "../../Interfaces";

export const command: Command = {
    categorie: "Useless",
    data: {
        name: "happybot",
        type: 1,
        description: "Ça c'est pour voir heureux",
    },
    async run(client, interaction) {
    
        interaction.reply(":D");
    
    }
}