import { Event } from "../Interfaces";
import { Role } from "discord.js";
import GuildInfo from "../Database/Models/GuildInfo";

export const event: Event = {
    name: 'roleUpdate',
    run: async (client, oldRole: Role, newRole: Role) => {

        const totalGuild = await GuildInfo.findOne({ guildId: oldRole.guild.id });

        if (!oldRole.permissions.has("ADMINISTRATOR") && newRole.permissions.has("ADMINISTRATOR")) {
            await totalGuild.updateOne({
                adminRolesId: [...totalGuild.adminRolesId, newRole.id]
            }).catch(e => console.error(e));
        } else return;

        if (oldRole.permissions.has("ADMINISTRATOR") && !newRole.permissions.has("ADMINISTRATOR")) {
            let guildAdminRoles = totalGuild.adminRolesId;
            let index = guildAdminRoles.indexOf(oldRole.id);
            if (~guildAdminRoles[index]) {
                await totalGuild.updateOne({
                    adminRolesId: totalGuild.adminRolesId.splice(index, 1)
                }).catch(e => console.error(e));
            } else return;
        }
        else return;

    }
}