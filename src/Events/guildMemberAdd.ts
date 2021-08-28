import { Event } from "../Interfaces";
import userAccount from "../Database/Models/userAccount";
import { GuildMember } from "discord.js";

export const event: Event = {
    name: "guildMemberAdd",
    run: async (client, member: GuildMember) => {
        await userAccount.create({
            guildName: member.guild.name,
            guildId: member.guild.id,
            username: member.user.username,
            tag: member.user.tag,
            ID: member.user.id,
            roles: [],
            joinedAt: member.joinedAt
        }).then(u => console.log(`Nouvel utilisateur enregistré: ${u.username}`)).catch(e => console.error(e));
    }
}