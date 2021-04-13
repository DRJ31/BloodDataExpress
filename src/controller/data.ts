import express = require("express");
import mysql = require("mysql");
import { DB_CONFIG } from "../config";

namespace DataHandler {
    export function fetchData(req: express.Request, res: express.Response) {
        if (!req.session.username) {
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
}

export default DataHandler;