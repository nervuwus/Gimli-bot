import Client from "./Client";
import { Intents } from "discord.js";

new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
}).init();