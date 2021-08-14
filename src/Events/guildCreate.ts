import { Event } from "../Interfaces";
import GuildInfo from "../Database/Models/GuildInfo";
import { Guild, Permissions } from "discord.js";

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
            prefix: "gi!",
            timestamp: guild.joinedAt,
            adminRolesId: adminRoles
        });

        console.log(`J'ai rejoins une nouvelle guilde: ${guild.name}`)
    }
}