import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import GuildInfo from "../../Database/Models/GuildInfo";

export const command: Command = {
    name: "reset",
    description: "Une commande pour restaurer les paramètre par défaut du serveur soit quand le bot a rejoins le serveur.",
    aliases: [],
    syntax: "reset",
    categorie: "Settings",
    run: async(client, message, args) => {
        if (message.author.id === message.guild.ownerId) {
            await GuildInfo.findOneAndDelete({ guildId: message.guild.id});
            client.emit("guildCreate", message.guild);
    
            const resetEmbed = new MessageEmbed()
    
                .setColor("#D23A1F")
                .setTitle("Paramètre par défaut restauré !")
                .setDescription("Tu repars donc par défaut avec un Gimli tout propre et toujours prêt à te servir")
                .setFooter("Un utilisateur à reset Gimli")
                .setTimestamp()
    
            message.channel.send({ embeds: [resetEmbed]});
        } else message.channel.send("Seul le propriétaire du serveur peut avoir accès à cette commande");
    }
}