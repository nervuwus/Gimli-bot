import { Event } from "../Interfaces";
import GuildInfo from "../Database/Models/GuildInfo";
import { Guild } from "discord.js";

export const event: Event = {
    name: "guildDelete",
    run: async (client, guild: Guild) => {
        let guildRemove = await GuildInfo.findOneAndDelete({ guildId: guild.id });
        console.log(`J'ai quitté une Guilde: ${guild.name}`)
    }
}