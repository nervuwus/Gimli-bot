import { Event } from "../Interfaces";
import { Role, Permissions } from "discord.js";
import GuildInfo from "../Database/Models/GuildInfo";

export const event: Event = {
    name: 'roleCreate',
    run: async (client, role: Role) => {

        const totalGuild = await GuildInfo.findOne({ guildId: role.guild.id });

        if (role.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            await totalGuild.updateOne({
                adminRolesId: [...totalGuild.adminRolesId, role.id]
            }).catch(e => console.error(e));
        } else return;
        
    }
}