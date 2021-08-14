import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: "stop",
    description: "Permet d'arrêter le bot.",
    aliases: ["s"],
    syntax: "stop",
    categorie: "Owner",
    run: async (client, message, args) => {
        if (message.author.id === "422848361062858752") process.kill(0);
        else {
            const notMeEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Commande illégale !")
                .setDescription(`Seul le développeur du bot peut utiliser ça ${message.author.username}`)

            message.reply({ embeds: [notMeEmbed] });
        }
    }
}
