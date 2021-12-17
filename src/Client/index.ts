import { Client, Collection } from 'discord.js';
import { connectDatabase } from "../Database/ConnectDatabase";
import { readdirSync } from 'fs';
import { Command, Event, Config } from "../Interfaces";
import ConfigJson from "../config.json";
import * as path from "path";

export default class ExtendedClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = ConfigJson;

    public async init() {
        await connectDatabase()
        this.login(this.config.token);

        const commandPath = path.join(__dirname, "..", "Commands");

        //#region Commande handler
        readdirSync(commandPath).forEach(dir => {
            const commandFile = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith(".js"));

            for (const file of commandFile) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.data.name, command);
                console.log(`command chargé: ${command.data.name}`);
            }
        });
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