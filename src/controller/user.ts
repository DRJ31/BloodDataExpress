import express = require("express");
import mysql = require("mysql");
import { DB_CONFIG } from "../config";

export function sessionHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.session.username) {
        res.status(403);
        res.send({ message: "请先登录" });
        return;
    }
    next();
}

namespace UserHandler {
    export function login(req: express.Request, res: express.Response) {
        if (!req.body.username || !req.body.password) {
            res.status(400);
            res.send({ message: "Invalid Request!" });
            return;
        }
        const { username, password } = req.body;
        const connection: mysql.Connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query("SELECT password FROM user WHERE username = ? ", [username], (err, rows, cols) => {
            if (err) {
                res.status(403);
                res.send({ message: "用户名或密码错误" });
                return;
            }
            if (rows[0] && rows[0].password == password) {
                req.session.username = username;
                res.send({ message: "登录成功", username });
            }
            else {
                res.status(403);
                res.send({ message: "用户名或密码错误" });
            }
            connection.end();
        })
    }
}

export default UserHandler;