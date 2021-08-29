import { Event } from "../Interfaces";
import { Role, Permissions } from "discord.js";
import GuildInfo from "../Database/Models/GuildInfo";

export const event: Event = {
    name: 'roleDelete',
    run: async (client, role: Role) => {

        const totalGuild = await GuildInfo.findOne({ guildId: role.guild.id });

        if (role.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            let guildAdminRoles = totalGuild.adminRolesId;
            let index = guildAdminRoles.indexOf(role.id);
            if (~guildAdminRoles[index]) {
                await totalGuild.updateOne({
                    adminRolesId: totalGuild.adminRolesId.splice(index, 1)
                }).catch(e => console.error(e));
            } else return;

        }
    }
}