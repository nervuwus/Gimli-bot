import { connect } from "mongoose";
import ConfigJson from "../config.json";

export const connectDatabase = async () => {
    await connect(ConfigJson.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Mongoose connecté")
}