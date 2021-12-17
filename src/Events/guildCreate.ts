import { Event } from "../Interfaces";
import GuildInfo from "../Database/Models/GuildInfo";
import { Guild, Permissions, MessageEmbed } from "discord.js";

export const event: Event = {
    name: "guildCreate",
    run: (client, guild: Guild) => {

        let adminRoles = [];

        guild.roles.cache.forEach(r => {
            if (r.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                adminRoles.push(r)
            } else return;
        
        })

        const createGuildInfo = GuildInfo.create({
            guildName: guild.name,
            guildId: guild.id,
            ownerId: guild.ownerId,
            timestamp: guild.joinedAt,
            adminRolesId: adminRoles
        });

        const newJoinedGuild = new MessageEmbed()

            .setColor("#D23A1F")
            .setTitle(`Me voici dans la guilde: ${guild.name} !`)
            .addField("Date d'arrivé:", guild.joinedAt.toString(), true)
            .addField("Date de création:", guild.createdAt.toString(), true)
            .addField("Nombre de membre:", guild.memberCount.toString(), true)
            .setThumbnail(guild.iconURL({ dynamic: true }))

        let personalGuild = guild.client.guilds.cache.get("874610021328101386");
        let channelToSend = personalGuild.channels.cache.get("879391613791645807")

        if (channelToSend.isText()) channelToSend.send({ embeds: [newJoinedGuild] });
        
    }
}