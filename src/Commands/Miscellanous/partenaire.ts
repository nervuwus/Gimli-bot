import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import partenaireInfo from "../../Database/Models/PartenaireInfo";

export const command: Command = {
    name: "partenaire",
    description: "Une commande permettant de connaître tous nos partenaire ! C'est un moyen pour GImli de les remerciers :D",
    aliases: [],
    syntax: "partenaire [name]",
    categorie: "Miscellanous",
    run: async (client, message, args) => {

        const partenaireListe = await partenaireInfo.find({ identifier: "Gimli" });
        if (partenaireListe.length > 0) {
            let PartenaireName = args[0];

            if (!PartenaireName) {
                const PartenaireListEmbed = new MessageEmbed()

                    .setColor("#D23A1F")
                    .setTitle("Ici se trouve ma liste d'amis mon petit gars !")
                partenaireListe.forEach(part => {
                    PartenaireListEmbed.setDescription(part.name);
                });

                message.channel.send({ embeds: [PartenaireListEmbed] });
            } else {
                const selectedPartenaire = await partenaireInfo.findOne({ name: args[0] });
                if (selectedPartenaire) {
                    const selectPartenaireInfo = new MessageEmbed()

                        .setColor("#D23A1F")
                        .setTitle(`Voici les information de: ${PartenaireName}`)
                        .setThumbnail(selectedPartenaire.image)
                        .setDescription("Hoho ! je vois que ça s'intéresse à un de mes amis héhé")
                        .addField("Nom: ", selectedPartenaire.name)
                        .addField("Description: ", selectedPartenaire.description)
                        .addField("Date du partenariat: ", selectedPartenaire.date)

                        let buttonList =
                        {
                            embeds: [selectPartenaireInfo],
                            components: [
                                {
                                    type: 1,
                                    components: []
                                }
                            ]
                        }

                    for (let i = 0; i < selectedPartenaire.url.length; i++) {
                        for (const links in selectedPartenaire.url[i]) {
                            let addButton = {
                                type: 2,
                                label: links,
                                style: 5,
                                url: selectedPartenaire.url[i][links]
                            }

                            buttonList.components[0].components.splice(i, 0, addButton);

                        }
                    }

                    let option = JSON.parse(JSON.stringify(buttonList, null, '\t'));

                    message.channel.send(option);
                } else message.channel.send("Je n'ai aucune ami avec ce nom là !")
            }

        } else {
            const PartenaireEmptyListEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Et voilà ma liste d'amis mon petit gars !")
                .setDescription("Elle est vide :/....Pour le moment !")

            message.channel.send({ embeds: [PartenaireEmptyListEmbed] });
        }

    }

}

