import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    categorie: "Miscellanous",
    data: {
        name: "invite",
        type: 1,
        description: "Commande pour obtenir un lien d'invitation !",
        options: [
            {
                name: "permissions",
                description: "La permissions que tu veux donner au bot",
                type: 3,
                required: false
            }
        ]
    },
    async run(client, interaction) {
        const defaultPermission = 8;
        let selectedPermissions = interaction.options.getString("permission");
        let permscope = `https://discord.com/api/oauth2/authorize?client_id=873999791430967296&permissions=${defaultPermission ?? selectedPermissions}&redirect_uri=https%3A%2F%2Fmerytek.github.io%2FGimli-bot%2Fcallback&scope=bot`;

        const inviteEmbed = new MessageEmbed()

        .setColor("#D23A1F")
        .setTitle(`Un nouveau serveur ? Ça veut dire plus d'argent !`)
        .setDescription(`Je me ferais un plaisir de faire un tour sur ton serveur ${interaction.user.username} !`)
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
        .setURL(permscope)

        interaction.reply({ 
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