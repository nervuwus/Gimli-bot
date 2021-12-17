import { Command } from "../../Interfaces";
import { MessageEmbed, Formatters } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

export const command: Command = {
    categorie: "Miscellanous",
    data: {
        name: "help",
        type: 1,
        description: "Permet d'obtenir l'aide sur toute les commandes",
        options: [
            {
                name: "commande",
                description: "La commande sur laquelle tu veux des informations",
                type: 3,
                required: false
            }
        ]
    },
    async run(client, interaction) {

        const file = readdirSync(join(__dirname, "../../Commands"));

        const commandName = interaction.options.getString("commande", false);

        if (!commandName) {

            const helpEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle(`Voici la liste de mes commande ${interaction.user.username}`)
                .setDescription(`C'est tout ce que je peux faire ! Si une commande t'intéresse utilise : ${Formatters.inlineCode("/help <commmande>")} et je te donnerais le plus d'info possible !\n\nPoint important l'ami si tu cherches les infos précise d'une commande. Je place ce panneau ⚠️ devant chaque argument de commande qui est obligatoire.`)
                .setFooter("Un utilisateur a demandé de l'aide !", interaction.user.avatarURL())
                .setTimestamp()

            for (const cats of file) {
                helpEmbed.addField(`${cats}`, `${client.commands.filter(cat => cat.categorie === cats).map(cmd => cmd.data.name).join(', ')}`)
            }

            interaction.reply({ embeds: [helpEmbed] });
        } else {
            const command = client.commands.get(commandName);

            if (!commandName) interaction.reply({content: "Désolé mais, la commande que tu cherches n'existe pas !"});
            else {
                const commandHelp = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle(`__${commandName}__`)
                .setDescription(command.data.description)
                .setFooter("Un utilisateu a demandé de l'aide sur une commande précise !", interaction.user.avatarURL())
                .setTimestamp()


                if (command.data.options) {
                    for (const param of command.data.options) {
                        if (param.required === true)
                            commandHelp.addField(`⚠️ ${param.name}`, param.description, true)
                        else commandHelp.addField(`${param.name}`, param.description, true)
                    }

                    interaction.reply({embeds: [commandHelp]});
            }

            } 
        }
    }
}