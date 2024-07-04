import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(` Connection Successfully ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log(`Connection Failed ${err}`)
    }
}