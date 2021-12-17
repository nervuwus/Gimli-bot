import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    categorie: "Miscellanous",
    data: {
        name: "source",
        type: 1,
        description: "Ici te sera révélé mon code",
    },
    async run(client, interaction) {
        const sourceEmbed = new MessageEmbed()
            .setColor("#D23A1F")
            .setTitle("Vers la source de Gimli ! *partie 1 chapitre 2 le retour*")
            .setURL("https://github.com/Merytek/Gimli-bot")
            .setDescription(`Voici ${interaction.user.username} l'accès au saint code de Gimli prépare toi à lire du TS mon frère\n\n Petit aparté le code est sous License MIT en claire vous pouvez réutiliser des bouts de code Gimli mais le camelot a besoin de gagner sa croûte donc vous devrez le citer`)

        interaction.reply({ embeds: [sourceEmbed] });
    }


}