import { Command } from "../../Interfaces";
import { MessageEmbed, Formatters } from "discord.js";

export const command: Command = {
    name: "eval",
    description: "Une commande qui permet de simuler du JS/TS sur le serveur.",
    aliases: [],
    syntax: "eval <code>",
    categorie: "Owner",
    run: async(client, message, args) => {
        if (message.author.id !== "422848361062858752") {
            const notMeEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Hep hep hep cette commande c'est non")
                .setDescription("Seul le créateur du bot peut utiliser cette commande")

            message.channel.send({ embeds: [notMeEmbed] })
            setTimeout(() => {
                message.delete();
            }, 3000);
        } else {
            const code = args.join(" ");
            const evaled = eval(code);

            const evalEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle(`Résultat de l'analyse`)
                .setDescription(Formatters.codeBlock("js", evaled))

            message.channel.send({ embeds: [evalEmbed] });
        }

    }
}