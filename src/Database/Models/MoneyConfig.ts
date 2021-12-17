import { model, Schema } from "mongoose";

export interface MoneyInfo {
    guildName: string;
    guildId: string;
    moneyNames: Array<string>;
    moneyValues: Array<object>;
    symbol: Array<object>
}

export const MoneyConfig = new Schema({
    guildName: String,
    guildId: String,
    moneyNames: Array,
    moneValues: Array,
    symbol: Array

})

const moneyConfig = model<MoneyInfo>("MoneyConfig", MoneyConfig);

export { moneyConfig };