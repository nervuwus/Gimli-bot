import { Command } from "../../Interfaces";

export const command: Command = {
    categorie: "Useless",
    data: {
        name: "goodbot",
        type: 1,
        description: "permet de me montrer votre gratitude.",
    },
    async run(client, interaction) {
    
        interaction.reply("Merci ! [^-^]");
    
    }
}