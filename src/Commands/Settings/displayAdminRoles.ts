import { Command } from "../../Interfaces";
import { MessageEmbed, Formatters, Permissions } from "discord.js";
import GuildInfo from "../../Database/Models/GuildInfo";

export const command: Command = {
    name: "displayadminroles",
    description: "Une commande pour voir les rôles Admin du bot",
    aliases: ["dysadmr",],
    syntax: "dysadmr",
    categorie: "Settings",
    run: async (client, message, args) => {

        const adminRoles = await GuildInfo.findOne({ guildId: message.guild.id });

        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || message.member.roles.cache.find(r => adminRoles.adminRolesId.includes(r.id))) {


            let displayedRoles = [];

            adminRoles.adminRolesId.forEach(ar => {
                displayedRoles.push(message.guild.roles.cache.find(r => r.id === ar).name);
            })

            const adminRolesEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Voici les rôles admin du serveur")
                .setDescription("Les rôles administrateur du bot ont accès aux commandes d'administrateur ils pourront donc modifier des parties importante du bot")
                .addField("Rôles Admin:", displayedRoles.toString())
                .setFooter("La liste des rôles Admin a été demandé")
                .setTimestamp()

            message.channel.send({ embeds: [adminRolesEmbed] });

        } else message.channel.send("Il faut que tu sois administrateur pour avoir accès à cette commande.");
    }
}
