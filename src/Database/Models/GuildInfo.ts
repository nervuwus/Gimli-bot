import { Document, model, Schema } from "mongoose";

export interface GuildInfo {
    guildName: string;
    guildId: string;
    ownerId: string;
    prefix: string;
    timestamp: string;
    adminRolesId: Array<string>;
}

export const GuildBasicsInfo = new Schema({
    guildName: String,
    guildId: String,
    ownerId: String,
    prefix: String,
    timestamp: String,
    adminRolesId: Array
})

export default model<GuildInfo>("GuildBasicsInfo", GuildBasicsInfo);