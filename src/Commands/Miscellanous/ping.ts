import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    categorie: "Miscellanous",
    data: {
        name: "ping",
        type: 1,
        description: "Permet de renvoyer le pong.",
    },

    async run(client, interaction) {
        const pingEmbed = new MessageEmbed()

        .setColor("#D23A1F")
        .setTitle(`Voici le Ping du bot ${interaction.user.username}`)
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
        .addField("Pong: ", `${interaction.client.ws.ping}ms`, true)
        .setFooter(`${interaction.user.username} a demandé le ping`, interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp()

    interaction.reply({ embeds: [pingEmbed] });
    }

}