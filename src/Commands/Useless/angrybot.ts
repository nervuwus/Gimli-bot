import { Command } from "../../Interfaces";

export const command: Command = {
    categorie: "Useless",
    data: {
        name: "angrybot",
        type: 1,
        description: "Ça c'est pour me voir énervé !",
    },
    async run(client, interaction) {
    
        interaction.reply(">:0");
    
    }
}