import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: "invite",
    description: "Une commande, qui, te donne le lien pour inviter le bot dans ton serveur.",
    aliases: [],
    syntax: "invite [permissions]",
    categorie: "Miscellanous",
    run: async(client, message, args) => {
        const defaultPermission = 8;
        let selectedPermissions = args[0];
        let permscope: string; 

        if (!selectedPermissions) {
            permscope = `https://discord.com/oauth2/authorize?client_id=873999791430967296&scope=bot&permissions=${defaultPermission}`;
        } else {
            permscope = `https://discord.com/oauth2/authorize?client_id=873999791430967296&scope=bot&permissions=${selectedPermissions}`
        }

        const inviteEmbed = new MessageEmbed()

        .setColor("#D23A1F")
        .setTitle(`Un nouveau serveur ? Ça veut dire plus d'argent !`)
        .setDescription(`Je me ferais un plaisir de faire un tour sur ton serveur ${message.author.username} !`)
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setURL(permscope)

        message.channel.send({ 
            embeds: [inviteEmbed],
            components: [
                {
                    type: 1,
                    components: [{
                        type: 2,
                        label: "Inviter",
                        style: 5,
                        url: permscope
                    }]
                }
            ]
        });
    }
}