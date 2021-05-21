import express = require("express");
import UserHandler from "./controller/user";
import BloodHandler from "./controller/blood";
import DailyHandler from "./controller/daily";
import { sessionHandler } from "./controller/user";

export default function (app: express.Application) {
    app.post('/api/login', UserHandler.login);
    app.post('/api/logout', UserHandler.logout);
    app.post('/api/check', sessionHandler, UserHandler.checkPassed);

    app.get('/api/blood', sessionHandler,BloodHandler.fetchBlood);
    app.get('/api/blood/date', sessionHandler, BloodHandler.fetchDateBlood);
    app.post('/api/blood', sessionHandler, BloodHandler.insertBlood);

    app.get('/api/daily', sessionHandler, DailyHandler.fetchDailyRecord);
    app.post('/api/daily', sessionHandler, DailyHandler.insertDailyRecord);
    app.put('/api/daily', sessionHandler, DailyHandler.updateDailyRecord);
    app.delete('/api/daily', sessionHandler, DailyHandler.deleteDailyRecord);
}