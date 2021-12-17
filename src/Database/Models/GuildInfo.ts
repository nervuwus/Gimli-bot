import { Document, model, Schema } from "mongoose";

export interface GuildInfo {
    guildName: string;
    guildId: string;
    ownerId: string;
    timestamp: string;
    adminRolesId: Array<string>;
}

export const GuildBasicsInfo = new Schema({
    guildName: String,
    guildId: String,
    ownerId: String,
    timestamp: String,
    adminRolesId: Array
})

const guildInfo = model<GuildInfo>("GuildBasicsInfo", GuildBasicsInfo);

export { guildInfo };