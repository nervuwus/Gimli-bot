import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import partenaireInfo from "../../Database/Models/PartenaireInfo";

export const command: Command = {
    categorie: "Miscellanous",
    data: {
        name: "partenaire",
        type: 1,
        description: "Permet de voir tous mes amis et partenaires.",
        options: [
            {
                name: "partenaire",
                description: "le partenaire sur lequel tu veux des informations",
                type: 3,
                required: false
            }
        ]
    },
    async run(client, interaction) {

        const partenaireListe = await partenaireInfo.find({ identifier: "Gimli" });
        if (partenaireListe.length > 0) {
            let PartenaireName = interaction.options.getString("partenaire");

            if (!PartenaireName) {
                const PartenaireListEmbed = new MessageEmbed()

                    .setColor("#D23A1F")
                    .setTitle("Ici se trouve ma liste d'amis mon petit gars !")
                partenaireListe.forEach(part => {
                    PartenaireListEmbed.setDescription(part.name);
                });

                interaction.reply({ embeds: [PartenaireListEmbed] });
            } else {
                const selectedPartenaire = await partenaireInfo.findOne({ name: PartenaireName });
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

                    interaction.reply(option);
                } else interaction.reply("Je n'ai aucune ami avec ce nom là !")
            }

        } else {
            const PartenaireEmptyListEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Et voilà ma liste d'amis mon petit gars !")
                .setDescription("Elle est vide :/....Pour le moment !")

            interaction.reply({ embeds: [PartenaireEmptyListEmbed] });
        }
    }

}

