import { Command } from "../../Interfaces";
import { MessageEmbed, Formatters } from "discord.js";
import GuildInfo from "../../Database/Models/GuildInfo";

export const command: Command = {
    name: "removeadminroles",
    description: "Une commande pour supprimer des rôles admins.",
    aliases: ["remr"],
    syntax: "removeroles <roleId1[, roleId2, ...roleIdn]>",
    categorie: "Settings",
    run: async (client, message, args) => {

        if (message.author.id === message.guild.ownerId) {

            const existingAdminRoles = await GuildInfo.findOne({ guildId: message.guild.id });

            const noneRemovedRoles = [];
            const removedRoles = [];
            let rolesList = existingAdminRoles.adminRolesId;

            let adminRoles = args.join(" ").split(", ");

            if (adminRoles.length) {

                adminRoles.forEach(ar => {
                    if (rolesList.includes(ar)) {
                        rolesList = rolesList.filter(item => item !== ar);
                        removedRoles.push(ar);
                    } else noneRemovedRoles.push(ar);
                });

                if (!removedRoles.length) removedRoles.push("Aucun");
                if (!noneRemovedRoles.length) noneRemovedRoles.push("Aucun");
                

                await existingAdminRoles.updateOne({ adminRolesId: rolesList });

                const adminRolesEmbed = new MessageEmbed()

                    .setColor("#D23A1F")
                    .setTitle("Des rôles admin ont été supprimé !")
                    .setDescription("Ces rôles ne pourront plus accéder aux commandes importante du bot")
                    .addField("Role.s Supprimé:", Formatters.codeBlock("diff", `-${removedRoles.toString()}`))
                    .addField("Role.s non Supprimé car non trouvé dans la DB", Formatters.codeBlock("diff", `-${noneRemovedRoles.toString()}`))
                    .setFooter("Des rôles admin ont été ajouté")
                    .setTimestamp()

                message.channel.send({ embeds: [adminRolesEmbed] });

            } else message.channel.send("Il faut au moins que tu me donnes une ID de rôle à supprimer.");
        } else message.channel.send("Seul le propriétaire du serveur peut avoir accès à cette commande");
    }
}