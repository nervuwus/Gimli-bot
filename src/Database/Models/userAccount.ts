import { model, Schema } from "mongoose";

export interface User {
    guildName: string;
    guildId: string;
    username: string;
    tag: string;
    ID: string;
    roles: Array<string>;
    joinedAt: string;
}

export const UserAccount = new Schema({
    guildName: String,
    guildId: String,
    username: String,
    tag: String,
    ID: String,
    roles: Array,
    joinedAt: String
})

const user = model<User>("UserAccount", UserAccount);

export { user };