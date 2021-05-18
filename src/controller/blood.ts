import express = require("express");
import mysql = require("mysql");
import {COOKIE_OPTION, DB_CONFIG} from "../config";
import dayjs = require("dayjs");

interface BloodData {
    uid?: number;
    date: string;
    leukocyte: number;
    hemoglobin: number;
    platelets: number;
    monocyte: number;
    monocyteP: number;
    neutrophil: number;
    reticulocyte: string;
    remark: string;
}

namespace BloodHandler {
    export function fetchDateBlood(req: express.Request, res: express.Response) {
        const { date } = req.query;
        const { uid } = req.session.user;

        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("SELECT * FROM blood WHERE date = DATE(?) AND uid = ?", [date, uid], (err, rows) => {
            if (err) {
                res.status(404);
                res.send({ message: "无数据" });
                return;
            }
            if (rows.length === 0) {
                res.cookie("username", req.session.user.username, COOKIE_OPTION)
                res.send({ result: null });
            }
            else {
                const result = rows[0];
                const removeList = ["date", "id", "uid"];
                for (let key of removeList) {
                    delete result[key];
                }
                res.cookie("username", req.session.user.username, COOKIE_OPTION)
                res.send({ result });
            }
        });
    }

    export function fetchBlood(req: express.Request, res: express.Response) {
        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("SELECT * FROM blood ORDER BY date DESC", (err, rows) => {
            if (err) {
                res.status(404);
                res.send({ message: "无数据" });
                return;
            }
            res.cookie("username", req.session.user.username, COOKIE_OPTION)
            res.send({ data: rows });
            connection.end();
        });
    }

    export function insertBlood(req: express.Request, res: express.Response) {
        const { data } = req.body;

        const bloodData: BloodData = data;
        bloodData.uid = req.session.user.uid;
        bloodData.date = dayjs(bloodData.date).format("YYYY-MM-DD");
        if (!bloodData.reticulocyte) {
            bloodData.reticulocyte = "";
        }
        if (!bloodData.remark) {
            bloodData.remark = "";
        }

        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("SELECT * FROM blood WHERE date = DATE(?) AND uid = ?", [bloodData.date, bloodData.uid], (err, rows) => {
            if (err) {
                res.status(400);
                res.send({ message: "系统错误" });
                connection.end();
                return;
            }
            if (rows.length > 0) {
                connection.query("UPDATE blood SET ? WHERE date = DATE(?) AND uid = ?", [
                    bloodData,
                    bloodData.date,
                    bloodData.uid
                ], (e) => {
                    if (e) {
                        res.status(400);
                        res.send({ message: e.sql });
                        connection.end();
                        return;
                    }
                    res.cookie("username", req.session.user.username, COOKIE_OPTION)
                    res.send({ message: "更改成功" });
                    connection.end();
                });
            }
            else {
                connection.query("INSERT INTO blood SET ?", bloodData, (e) => {
                    if (e) {
                        res.status(400);
                        res.send({ message: "添加失败" });
                        connection.end();
                        return;
                    }
                    res.cookie("username", req.session.user.username, COOKIE_OPTION)
                    res.send({ message: "添加成功" });
                    connection.end();
                });
            }
        });
    }
}

export default BloodHandler;