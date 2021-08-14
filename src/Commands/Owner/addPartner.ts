import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import PartenaireInfo from "../../Database/Models/PartenaireInfo";

export const command: Command = {
    name: "addpartner",
    description: "Une commande qui me permet d'ajouter, mes partenaires dans la DB, ce qui est très pratique.",
    aliases: ["addp"],
    syntax: "addPartner <name> <\"description\"> <{linkName: URL}> <Attachment>",
    categorie: "Owner",
    run: async (client, message, args) => {

        if (message.author.id === "422848361062858752") {

            let sliceArgs = args.join(" ").split('\"');

            let partnerName = sliceArgs.shift();
            let partnerDescription = sliceArgs[0];
            let partnerUrl = sliceArgs[1].trim().split(" ");
            let partnerDate = new Date()

            let dictURL = [];

            let partnerUrlIterator = partnerUrl[Symbol.iterator]();

            for (const url of partnerUrlIterator) {
                let obj = {};
                let key = url;
                if (key === url) {
                    obj[key] = partnerUrlIterator.next().value;
                    dictURL.push(obj);
                }
            };

            message.attachments.forEach(async attachment => {
                const Image = attachment.proxyURL;
                if (Image) {
                    let addPartner = await PartenaireInfo.create({
                        name: partnerName.trim(),
                        description: partnerDescription,
                        date: partnerDate.toLocaleDateString(),
                        url: dictURL,
                        identifier: "Gimli",
                        image: Image
                    });

                    const PartnerAdd = new MessageEmbed()

                        .setColor("#D23A1F")
                        .setTitle("Nouveau partenaire ajouté !")
                        .setThumbnail(Image)
                        .addField("Nom:", partnerName)
                        .addField("Description:", partnerDescription)

                    message.channel.send({ embeds: [PartnerAdd] });
                } else return;
            });


        } else {
            const notMeEmbed = new MessageEmbed()

                .setColor("#D23A1F")
                .setTitle("Commande illégale !")
                .setDescription(`Seul le développeur du bot peut utiliser ça ${message.author.username}`)

            message.reply({ embeds: [notMeEmbed]});
        }
    }
}