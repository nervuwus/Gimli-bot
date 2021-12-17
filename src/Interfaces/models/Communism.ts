import { Document } from "mongoose";

export default interface ICommunism extends Document {
    guildName: string;
    guildId: string;
    bankCentral: number;
    givenPercent: {[key: string]: number};
    contribution: number
}