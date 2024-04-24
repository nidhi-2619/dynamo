import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log("Connected to MongoDB!")
    } catch (err) {
        console.error("MongoDB connection error",err)
        process.exit()
    //     //process is the current process on which it is runnning
    }
}

export default connectDB;