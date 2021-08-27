import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: "support",
    description: "Permet d'accéder au serveur officiel de Gimli.",
    aliases: [],
    syntax: "support",
    categorie: "Miscellanous",
    run: async (client, message, args) => {
        const supportEmbed = new MessageEmbed()

            .setColor("#D23A1F")
            .setTitle(`Voici le lien vers le serveur ${message.author.username}`)
            .setDescription("En cliquant sur ce lien tu seras automatiquement redirigé vers mon serveur Discord là pù tu pourras parler à mon créateur et aux autres utilisateurs qui pourront t'aider à résoudre tes problèmes et répondre à tes questions")
            .setFooter(`${message.author.username} a demandé le support`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send({
            embeds: [supportEmbed],
            components: [
                {
                    type: 1,
                    components: [{
                        type: 2,
                        label: "Rejoindre",
                        style: 5,
                        url: "https://discord.gg/ewq89U9esh"
                    }]
                }
            ]
        });
    }
}