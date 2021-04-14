import express = require("express");
import mysql = require("mysql");
import { DB_CONFIG } from "../config";
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

namespace DataHandler {
    export function fetchData(req: express.Request, res: express.Response) {
        if (!req.session.user) {
            res.status(403);
            res.send({ message: "请先登录" });
            return;
        }
        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("SELECT * FROM blood ORDER BY date DESC", (err, rows, cols) => {
            if (err) {
                res.status(404);
                res.send({ message: "无数据" });
                return;
            }
            res.send({ data: rows });
            connection.end();
        });
    }

    export function insertData(req: express.Request, res: express.Response) {
        const { data } = req.body;

        let bloodData: BloodData = data;
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
        connection.query("SELECT * FROM blood WHERE date = DATE(?) AND uid = ?", [bloodData.date, bloodData.uid], (err, rows, cols) => {
            if (err) {
                res.status(400);
                res.send({ message: "系统错误" });
                connection.end();
                return;
            }
            if (rows.length > 0) {
                res.status(403);
                res.send({ message: "日期已存在" });
                connection.end();
                return;
            }
            connection.query("INSERT INTO blood SET ?", bloodData, (e) => {
                if (e) {
                    res.status(400);
                    res.send({ message: "添加失败" });
                    connection.end();
                    return;
                }
                res.send({ message: "添加成功" });
                connection.end();
            });
        });
    }
}

export default DataHandler;