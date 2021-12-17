import { Document, model, Schema } from "mongoose";

export interface Partenaire {
    name: string,
    description: string,
    date: string,
    url: Array<{[key: string]: string}>,
    identifier: string,
    image: string
}

export const PartenaireInfo = new Schema({
    name: String,
    description: String,
    date: String,
    url: Array,
    identifier: String,
    image: String
});

const partner = model<Partenaire>("PartenaireInfo", PartenaireInfo);

export { partner };