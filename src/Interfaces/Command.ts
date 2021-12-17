import { CommandInteraction } from "discord.js";
import Client from "../Client";

interface execute {
    (client: Client, interaction: CommandInteraction)
};

export interface Command {
    categorie: String,
    data: any,
    run: execute
}