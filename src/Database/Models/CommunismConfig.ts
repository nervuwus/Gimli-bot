import { Document, model, Schema } from "mongoose";

export interface Communism {
    guildName: string;
    guildId: string;
    bankCentral: number;
    givenPercent: {[key: string]: number};
    contribution: number

}

export const CommunismConfig = new Schema({
    guildName: String,
    guildId: String,
    bankCentral: Number,
    givenPercent: Object,
    contribution: Number

})

export default model<Communism>("CommunismConfig", CommunismConfig);