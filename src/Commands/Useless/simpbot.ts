import { Command } from "../../Interfaces";

export const command: Command = {
    categorie: "Useless",
    data: {
        name: "simpbot",
        type: 1,
        description: "Pour simp sur ma personne",
    },
    async run(client, interaction) {
    
        interaction.reply(">///<");
    
    }
}