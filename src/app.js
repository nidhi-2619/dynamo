import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// for configuration we use app.use
//also for middleware we use app.use
// this means i'm accepting cors
app.use(cors({
    // origin: "http://localhost:3000",
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// this means i'm accepting json
app.use(express.json(
    {
        limit: "50mb"
    }
));

// for getting data from the url, it encodes the data
app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

// accessble to everyone
app.use(express.static("public"))

// to perform crud on cookies 
// the cookies are stored on the system server
app.use(cookieParser())