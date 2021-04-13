import express = require("express");
import session = require("express-session");
import cors = require("cors");

import router from "./router";
import { SESS_SECRET } from "./config";

// Define session user's structure
interface User {
    uid: number;
    username: string;
}

// Setup session format
declare module "express-session" {
    interface Session {
        user: User;
    }
}

// Setup express
const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Setup session
app.use(session({
    secret: SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

router(app);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});