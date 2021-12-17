import { Command } from "../../Interfaces";

export const command: Command = {
    categorie: "Useless",
    data: {
        name: "sadbot",
        type: 1,
        description: "Si tu veux me voir triste",
    },

    async run(client, interaction) {
    
        interaction.reply("TwT");
    
    }
}