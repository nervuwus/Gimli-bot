import { Command } from "../../Interfaces";
import { MessageEmbed, Formatters } from "discord.js";
import GuildInfo from "../../Database/Models/GuildInfo";

export const command: Command = {
    name: "addadminroles",
    description: "Une commande pour ajouter des rôles admin au bot **Attention ne donnez pas cette permission à n'importe quel rôle les utilisateurs ayant un rôle sauvegardé en temps qu'admin pourra agir en tant qu'admin sur le bot même s'il n'a pas explicitement la permission administateur** ",
    aliases: ["admr", "adminr"],
    syntax: "adminroles <role1[, role2, ...rolen]>",
    categorie: "Settings",
    run: async (client, message, args) => {

        if (message.author.id === message.guild.ownerId) {

            const existingAdminRoles = await GuildInfo.findOne({ guildId: message.guild.id });

            const addedRole = [];
            const alreadyExistingRole = [];
            const roleNotFound = [];

            let adminRoles = args.join(" ").split(", ");

            if (adminRoles.length) {

                adminRoles.forEach(async ar => {
                    if (existingAdminRoles.adminRolesId.includes(ar)) alreadyExistingRole.push(ar);
                    else if (message.guild.roles.cache.find(r => r.id === ar)) addedRole.push(ar);
                    else roleNotFound.push(ar);
                });

                let concatedArrays = existingAdminRoles.adminRolesId.concat(addedRole);
                await existingAdminRoles.updateOne({ adminRolesId: concatedArrays });

                if (!addedRole.length) addedRole.push("Aucun");
                if (!alreadyExistingRole.length) alreadyExistingRole.push("Aucun");
                if (!roleNotFound.length) roleNotFound.push("Aucun");

                const adminRolesEmbed = new MessageEmbed()

                    .setColor("#D23A1F")
                    .setTitle("De nouveaux rôle admin ont été ajouté !")
                    .setDescription("Attention les rôles ajouté en tant qu'administrateur du bot auront accès aux commandes d'administrateur ils pourront donc modifier des parties important du bot")
                    .addField("Role ajouté:", Formatters.codeBlock("diff", `+${addedRole.toString()}`))
                    .addField("Role non ajouté car déjà existant:", Formatters.codeBlock("diff", `-${alreadyExistingRole.toString()}`))
                    .addField("Role non ajouté car non trouvé sur le serveur:", Formatters.codeBlock("diff", `-${roleNotFound.toString()}`))
                    .setFooter("Des rôles admin ont été ajouté")
                    .setTimestamp()

                message.channel.send({ embeds: [adminRolesEmbed] });

            } else message.channel.send("Il faut au moins que tu me donnes une ID de rôle à sauvegarder.");
        } else message.channel.send("Seul le propriétaire du serveur peut avoir accès à cette commande");
    }
}