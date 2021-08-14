import { Event } from "../Interfaces";
import GuildInfo from "../Database/Models/GuildInfo";
import { Guild, MessageEmbed } from "discord.js";

export const event: Event = {
    name: "guildUpdate",
    run: async (client, oldGuild: Guild, newGuild: Guild) => {

        if (oldGuild.ownerId !== newGuild.ownerId) {
            const guildOwner = await GuildInfo.findOne({ guildId: newGuild.id });
            await guildOwner.updateOne({ ownerId: newGuild.ownerId });

            let newOwnerName = newGuild.members.cache.find(u => u.id === newGuild.ownerId);

            const newOwner = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Faites place au nouveau propriétaire du serveur !")
                .setDescription("Sachez que je vous serais aussi fidèle à vous aussi nouveau propriétaire")
                .addField("Owner:", newOwnerName.user.username)
                .setFooter("Le propriétaire a changé")
                .setTimestamp()

            newGuild.channels.fetch().then(m => {
                let lastMessage = m.first();
                if (lastMessage.isText()) {
                    lastMessage.send({ embeds: [newOwner]});
                } else {
                    oldGuild.channels.create("changement-owner", {reason: "Annoncer le changement de propriétaire"})
                    .then(m => m.send({ embeds: [newOwner] })).catch(console.error);
                }
                
            });
        }

    }
}