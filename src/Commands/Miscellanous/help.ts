import { Command } from "../../Interfaces";
import { MessageEmbed, Formatters } from "discord.js";
import { readdirSync } from 'fs';
import GuildInfo from "../../Database/Models/GuildInfo";
import * as path from "path";

export const command: Command = {
    name: "help",
    description: "La sainte commande, qui permet d'afficher toute les commandes du bot.",
    aliases: ["h"],
    syntax: "help [command_name]",
    categorie: "Miscellanous",
    run: async(client, message, args) => {
        const folderPath = path.join(__dirname, "..");
        const folderList = readdirSync(folderPath);
        const serverPrefix = await GuildInfo.findOne({ guildId: message.guild.id });
        let selectedCommand = args[0];

        if (!selectedCommand) {
            const helpList = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle(`Voici la liste de mes commande ${message.author.username}`)
                .setDescription(`Une commande t'intéresse ? utilise : ${Formatters.inlineCode(`${serverPrefix.prefix}help <commmand_name>`)}`)
                .setFooter("message d'aide envoyé", message.author.displayAvatarURL({ dynamic: true }))

            for (const folder of folderList) {
                helpList.addField(folder.toString(), client.commands.filter(cat => cat.categorie === folder).map(cmd => Formatters.inlineCode(cmd.name)).join(", "))
            }

            message.channel.send({ embeds: [helpList] });
        } else {
            const pointedCommand = client.commands.get(selectedCommand);

            let displayAlias: string;

            if (pointedCommand.aliases.length === 0) displayAlias = "Aucun alias pour cette commande";
            else displayAlias = pointedCommand.aliases.toString();

            const pointedCommandHelpEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle(`Voici les informations de la commande : ${pointedCommand.name}`)
                .setDescription("Je te préviens il y a 2 types d'arguments possible dans la syntaxe ceux-là [] et ceux-là <> les premiers ne sont pas obligatoires cependant les seconds sont obligatoires sinon la commande ne fonctionnera pas")
                .addField("Description:", pointedCommand.description.toString())
                .addField("Alias:", displayAlias)
                .addField("Syntaxe:", pointedCommand.syntax.toString())
                .setFooter("message d'aide envoyé", message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            message.channel.send({ embeds: [pointedCommandHelpEmbed] });

        }
    }
}