import { Client, Collection } from 'discord.js';
import { connectDatabase } from "../Database/ConnectDatabase";
import { readdirSync } from 'fs';
import { Command, Event, Config } from "../Interfaces";
import ConfigJson from "../config.json";
import * as path from "path";

class ExtendedClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public config: Config = ConfigJson;

    public async init() {
        await connectDatabase()
        this.login(this.config.token);

        const commandPath = path.join(__dirname, "..", "Commands");

        //#region Commande handler
        readdirSync(commandPath).forEach(dir => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith(".ts"));

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                console.log(`command chargé: ${command.name}`);

                if (command?.aliases.length !== 0) {
                    command.aliases.forEach(alias => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        })
        //#endregion Commande handler

        //#region Event handler
        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            console.log(`event chargé: ${event.name}`);
            this.on(event.name, event.run.bind(null, this))
        })
        //#endregion Command handler
    }
    
}

export default ExtendedClient;