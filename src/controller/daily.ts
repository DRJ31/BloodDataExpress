import express = require("express");
import mysql = require("mysql");
import dayjs = require("dayjs");
import {COOKIE_OPTION, DB_CONFIG} from "../config";
import daily from "./daily";

interface DailyRecord {
    uid?: number;
    temperature: number;
    oxygen: number;
    pressure_high: number;
    pressure_low: number;
    heart_rate: number;
    weight?: number;
    time: string
}

namespace DailyHandler {
    export function fetchDailyRecord(req: express.Request, res: express.Response) {
        const { uid } = req.session.user;

        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("SELECT * FROM daily WHERE uid = ? ORDER BY time DESC", uid, (err, rows) => {
            if (err) {
                res.status(404);
                res.send({ message: "无数据" });
                return;
            }
            res.cookie("username", req.session.user.username, COOKIE_OPTION);
            res.send({ data: rows });
        })
    }

    export function insertDailyRecord(req: express.Request, res: express.Response) {
        const { data } = req.body;

        const dailyRecord: DailyRecord = data;
        dailyRecord.time = dayjs(data.date).format("YYYY-MM-DD HH:mm:ss");
        dailyRecord.uid = req.session.user.uid;

        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("INSERT INTO daily SET ?", dailyRecord, (e) => {
            if (e) {
                res.status(400);
                res.send({ message: "添加失败" });
                connection.end();
                return;
            }
            res.cookie("username", req.session.user.username, COOKIE_OPTION);
            res.send({ message: "添加成功" });
            connection.end();
        });
    }

    export function updateDailyRecord(req: express.Request, res: express.Response) {
        const { data, id } = req.body;

        const dailyRecord: DailyRecord = data;
        if (dailyRecord.weight.toString().length === 0) {
            dailyRecord.weight = 0;
        }

        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("UPDATE daily SET ? WHERE id = ?", [dailyRecord, id], (e) => {
            if (e) {
                console.log(e)
                res.status(400);
                res.send({ message: "更新失败" });
                connection.end();
                return;
            }
            res.cookie("username", req.session.user.username, COOKIE_OPTION);
            res.send({ message: "更新成功" });
            connection.end();
        });
    }

    export function deleteDailyRecord(req: express.Request, res: express.Response) {
        const { id } = req.query;

        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("DELETE FROM daily WHERE id = ?", id, (e) => {
            if (e) {
               res.status(400);
               res.send({ message: "删除失败" });
               connection.end();
               return;
            }
            res.cookie("username", req.session.user.username, COOKIE_OPTION);
            res.send({ message: "删除成功" });
            connection.end();
        })
    }
}

export default DailyHandler;