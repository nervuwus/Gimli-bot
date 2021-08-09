import Client from "../Client";
import { Message } from "discord.js";

interface Run {
    (client: Client, message: Message, args: Array<string>);

}

export interface Command {
    name: string;
    description?: string;
    aliases?: Array<string>;
    syntax: string;
    run: Run;
}