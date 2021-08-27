import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import { restart } from "nodemon";

export const command: Command = {
    name: "restart",
    description: "Commande permettant de relancer le bot",
    aliases: ["reboot", "rs"],
    syntax: "restart",
    categorie: "Owner",
    run: async (client, message, args) => {
        if (message.author.id === "422848361062858752") restart()
        else {
            const notMeEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Commande illégale !")
                .setDescription(`Seul le développeur du bot peut utiliser ça ${message.author.username}`)

            message.reply({ embeds: [notMeEmbed] });
        }
    }
}
