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


//routes import

import userRouter from "./routes/user.route.js";

//routes declaration
// we were using router and controller at one place when we were using get and post
// now we are separating router and controller so we have to use the middleware to use the router
// controll is tranfered to the userRouter
// this is act as prefix in route
app.use("/api/v1/user", userRouter);



export {app};