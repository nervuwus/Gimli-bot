import { model, Schema } from "mongoose";
import ICommunism from "../../Interfaces/models/Communism";

export const CommunismConfig = new Schema({
    guildName: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    bankCentral: {
        type: Number,
        required: true,
    },
    givenPercent: {
        type: Object,
        required: true,
    },
    contribution: {
        type: Number,
        required: true,
    }

});

const communism = model<ICommunism>("CommunismConfig", CommunismConfig);

export { communism };