import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    categorie: "Miscellanous",
    data: {
        name: "support",
        type: 1,
        description: "Le passe pour aller dans ma mine personnel",
    },
    async run(client, interaction) {
        const supportEmbed = new MessageEmbed()

            .setColor("#D23A1F")
            .setTitle(`Voici le lien vers le serveur ${interaction.user.username}`)
            .setDescription("En cliquant sur ce lien tu seras automatiquement redirigé vers mon serveur Discord là où tu pourras parler à mon créateur et aux autres utilisateurs qui pourront t'aider à résoudre tes problèmes et répondre à tes questions")
            .setFooter(`${interaction.user.username} a demandé le support`, interaction.user.avatarURL({ dynamic: true }))
            .setTimestamp()

        interaction.reply({
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