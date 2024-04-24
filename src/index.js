import dotenv from 'dotenv';
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/database.js";

dotenv.config({
    path:"./.env"
})

connectDB();




















// ___________APPROACH FIRST_______________
// import express from "express";

// const app = express();
// // iffy
// // ; is used for cleaning because if someone forgot to add ; in previous versions of code, it will not break the code
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/4{DB_NAME}`)
//         // not able to connect
//         app.on("error", (err)=>{
//             console.error(err)
//             throw err
//         }) 
//         // able to listen on port 
//         console.log("Connected to MongoDB!")
//     } catch (err) {
//         console.error("ERROR: ",err)
//     }
// })()