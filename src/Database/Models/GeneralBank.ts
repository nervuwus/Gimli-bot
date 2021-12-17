import { model, Schema } from "mongoose";

export interface AllBank {
    bankAmount: number,
    identifier: string,
}

export const AllBankAmount = new Schema({
    bankAmount: { 
        type: Number, 
        default: 0,
        required: false 
    },
    identifier: {
        type: String,
    }
})

const globalBank = model<AllBank>("TotalBankAmount", AllBankAmount);

export { globalBank };