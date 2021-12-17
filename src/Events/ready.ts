import { Event } from "../Interfaces";
import AllBankAmount from "../Database/Models/GeneralBank";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as path from "path";
import { readdirSync } from "fs";

export const event: Event = {
    name: 'ready',
    run: async (client) => {

        const commands = [];

        const commandFiles = path.join(__dirname, "..", "Commands");

        readdirSync(commandFiles).forEach(dir => {
            const commandFile = readdirSync(`${commandFiles}/${dir}`).filter(file => file.endsWith(".js"));

            for (const file of commandFile) {
                const { command } = require(`${commandFiles}/${dir}/${file}`);
                commands.push(command.data);
            }
        });

        const rest = new REST({ version: '9' }).setToken(client.config.token);

        try {
            console.log("Refresh application (/) command");

            await rest.put(
                Routes.applicationGuildCommands(client.user.id, "874610021328101386"),
                { body: commands },
            );
        } catch (e) {
            console.error(e);
        }

        const clientBank = await AllBankAmount.find({ identifier: "Exist" })
        if (clientBank.length > 0) {
            console.log(`Je m'appelle ${client.user.username} et je vais BIEN`)
            let i = 0;
            setInterval(async () => {
                let memberCount = [];
                let sum = 0
                let banks = await AllBankAmount.findOne({ identifier: "Exist" });
                if (i === 0) i++
                else i--;
                const Guilds = client.guilds.cache.map(g => g.id).length;
                client.guilds.cache.map(g => memberCount.push(g.memberCount))
                for (let i = 0; i < memberCount.length; i++) {
                    sum += memberCount[i];
                }
                let presence = [`gérer l'argent de ${sum} utilisateurs dans ${Guilds} serveurs`,
                `gérer ${banks.bankAmount} devises`]
                client.user.setPresence({ activities: [{ name: presence[i] }], status: "dnd" });
            }, 20000)
        }
        else await AllBankAmount.create({
            bankAmount: 0,
            identifier: "Exist"
        });

    }
}