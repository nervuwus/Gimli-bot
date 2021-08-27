import { Document, model, Schema } from "mongoose";

export interface AllBank {
    bankAmount: number,
    identifier: string,
}

export const AllBankAmount = new Schema({
    bankAmount: { type: Number, default: 0},
    identifier: String
})

export default model<AllBank>("TotalBankAmount", AllBankAmount);