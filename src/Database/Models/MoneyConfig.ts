import { Document, model, Schema } from "mongoose";

export interface MoneyInfo {
    guildName: string;
    guildId: string;
    moneyNames: Array<string>;
    moneyValues: Array<object>;
    symbols: Array<object>
}

export const MoneyConfig = new Schema({
    guildName: String,
    guildId: String,
    moneyNames: Array,
    moneValues: Array,
    symbol: Array

})

export default model<MoneyInfo>("MoneyConfig", MoneyConfig);
