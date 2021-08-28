import { Command } from "../../Interfaces";
import { MessageEmbed, Permissions, Formatters } from "discord.js";
import GuildInfo from "../../Database/Models/GuildInfo";

export const command: Command = {
    name: "prefix",
    description: "Une commande pour changer le prefix du bot comme bon te semble.",
    aliases: [],
    syntax: "prefix <new_prefix>",
    categorie: "Settings",
    run: async(client, message, args) => {

        const oldPrefix = await GuildInfo.findOne({ guildId: message.guild.id });

        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || message.member.roles.cache.find(r => oldPrefix.adminRolesId.includes(r.id))) {

            let newPrefix = args[0];

            if (oldPrefix.prefix === newPrefix) message.channel.send("C'est déjà le prefix que j'ai de réglé pour ce serveur");
            else {
                await oldPrefix.updateOne({ prefix: newPrefix });
                const updatedPrefix = new MessageEmbed()

                    .setColor("#D23A1F")
                    .setTitle("Mon prefix a été changé !")
                    .setDescription(`Mon prefix est à présent : ${newPrefix} teste le dés maintenant avec la commande ${Formatters.inlineCode(`${newPrefix}help`)}`)
                    .setFooter("Le prefix a été changé")

                message.channel.send({ embeds: [updatedPrefix]});
            }

        } else message.channel.send("Tu as besoin de la permission : `ADMINISTRATOR` pour changer mon prefix");
    }
}