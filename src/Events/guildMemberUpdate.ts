import { Event } from "../Interfaces";
import { GuildMember } from "discord.js";
import userAccount from "../Database/Models/userAccount";

export const event: Event = {
    name: 'guildMemberUpdate',
    run: async (client, oldMember: GuildMember, newMember: GuildMember) => {
        const DbUser = await userAccount.findOne({ ID: oldMember.user.id });

        if (oldMember.user.username !== newMember.user.username) await DbUser.updateOne({ username: newMember.user.username })
        else return;

        if (oldMember.user.tag !== newMember.user.tag) await DbUser.updateOne({ tag: newMember.user.tag });
        else return;

        if (oldMember.roles.cache.map(r => r.id) !== newMember.roles.cache.map(r => r.id)) {
            let newRoles = [];
            newRoles.push(newMember.roles.cache.map(r => r.id));
    
            await DbUser.updateOne({
                role: DbUser.roles.concat(newRoles)
            }).then(u => console.log(`Utilisateur modifié: ${u.username}`)).catch(e => console.error(e));
        } else return;

    }
}