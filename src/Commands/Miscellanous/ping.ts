import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: "ping",
    description: "Une simple commande de ping.",
    aliases: [],
    syntax: "ping",
    categorie: "Miscellanous",
    run: async(client, message, args) => {
        const pingEmbed = new MessageEmbed()

            .setColor("#D23A1F")
            .setTitle(`Voici le Ping du bot ${message.author.username}`)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addField("Pong: ", `${client.ws.ping}ms`, true)
            .setFooter(`${message.author.username} a demandé le ping`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send({ embeds: [pingEmbed] });
    }
}