import express = require("express");
import UserHandler from "./controller/user";
import BloodHandler from "./controller/blood";
import { sessionHandler } from "./controller/user";

export default function (app: express.Application) {
    app.post('/api/login', UserHandler.login);
    app.get('/api/blood', sessionHandler,BloodHandler.fetchBlood);
    app.get('/api/blood/date', sessionHandler, BloodHandler.fetchDateBlood);
    app.post('/api/blood', sessionHandler, BloodHandler.insertBlood);
    app.post('/api/logout', UserHandler.logout);
    app.post('/api/check', sessionHandler, UserHandler.checkPassed);
}