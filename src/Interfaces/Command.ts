import { CommandInteraction } from "discord.js";
import Client from "../Client";

interface execute {
    (client: Client, interaction: CommandInteraction)
};

export interface Command {
    categorie: string,
    data: {
        name: string,
        type: number,
        description: string,
        options?: Array<{
            name: string,
            description: string,
            type: number,
            required?: boolean,
            choices?: Array<{
                name: string,
                value: string | number
            }>,
            autocomplete?: boolean
        }>

    },
    run: execute
}