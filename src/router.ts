import express = require("express");
import UserHandler from "./controller/user";
import DataHandler from "./controller/data";
import { sessionHandler } from "./controller/user";

export default function (app: express.Application) {
    app.post('/api/login', UserHandler.login);
    app.get('/api/data', sessionHandler,DataHandler.fetchData);
}