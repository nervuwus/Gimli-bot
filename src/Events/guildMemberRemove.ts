import { Event } from "../Interfaces";
import userAccount from "../Database/Models/userAccount";
import { GuildMember } from "discord.js";

export const event: Event = {
    name: "guildMemberRemove",
    run: async (client, member: GuildMember) => {
        await userAccount.findOneAndDelete({ ID: member.user.id })
        .then(u => console.log(`Utilisateur supprimé: ${u.username}`))
        .catch(e => console.error(e));
    }
}