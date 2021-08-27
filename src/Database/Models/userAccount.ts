import { Document, model, Schema } from "mongoose";

export interface User {
    guildName: string;
    guildId: string;
    username: string;
    roles: Array<string>;
        
}

export const UserAccount = new Schema({
    bankAmount: { type: Number, default: 0},
    identifier: String
})

export default model<User>("UserAccount", UserAccount);