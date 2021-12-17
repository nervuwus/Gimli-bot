import { Interaction, Formatters, MessageEmbed } from "discord.js";
import Client from "../Client";
import { Event } from "../Interfaces";

export const event: Event = {
    name: 'interactionCreate',
    run: async (client: Client, interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.run(client, interaction);
        } catch (e) {
            if (e) {
                const error = new MessageEmbed()

                    .setColor("#D23A1F")
                    .setTitle("Une ~~menace~~ Erreur a été détecté")
                    .setDescription(`hmmm ce n'est pas normal rejoins ${Formatters.hyperlink("Mon serveur de support", "https://discord.gg/ewq89U9esh")} pour envoyer la partie erreur à ma créatrice`)
                    .addField("Erreur", Formatters.codeBlock("js", e))
                    .setFooter("erreur lors de l'execution d'une commande")
                    .setTimestamp()
                await interaction.reply({embeds: [error], ephemeral: true});
            }
        }
    }
}