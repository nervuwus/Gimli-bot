import { Document, model, Schema } from "mongoose";

export interface GuildEconomyInfo {
    guildName: string;
    guildId: string;
    noMoneyRoles: Array<string | undefined>;
    criminalRoles: Array<string | undefined>;
    capitalism: boolean;
    formula: string;
    roleValues: Array<{[key: string]: number}>;
    maxUserAccount: number;
    maxMoneyAccount: Array<{[key: string]: number | string}>,

}

export const GuildEconomySettings = new Schema({
    guildName: String,
    guildId: String,
    noMoneyRoles: Array,
    criminalRoles: Array,
    capitalism: Boolean,
    formula: String,
    rolesValue: Array,
    maxUserAccount: Number,
    maxMoneyAccount: Array

})

export default model<GuildEconomyInfo>("GuildEconomySettings", GuildEconomySettings);