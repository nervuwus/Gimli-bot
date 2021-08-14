import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: "source",
    description: "Une commande permettant de voir le code derrière Gimli",
    aliases: ["src"],
    syntax: "source",
    categorie: "Miscellanous",
    run: async(client, message, args) => {
        const sourceEmbed = new MessageEmbed()

            .setColor("#D23A1F")
            .setTitle("Vers la source de Gimli ! *partie 1 chapitre 2 le retour*")
            .setURL("https://github.com/Merytek/Gimli-bot")
            .setDescription(`Voici ${message.author.username} l'accès au saint code de Gimli prépare toi à lire du TS mon frère\n\n Petit aparté le code est sous License MIT en claire vous pouvez réutiliser des bouts de code Gimli mais le camelot a besoin de gagner sa croûte donc vous devrez le citer`)

        message.channel.send({ embeds: [sourceEmbed] });
    }

}