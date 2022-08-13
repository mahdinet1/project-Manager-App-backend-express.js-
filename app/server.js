const express = require("express");
const mongoose = require("mongoose");
const { AppRouter } = require("./router/router");
module.exports = class Server {
    #app = express();
    constructor(PORT, DB_URL) {
        this.configDb(DB_URL);
        this.configApp();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }
    configApp() {
        const path = require("path");
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "../", "public")));
    }
    configDb(DB_URL) {
        mongoose.connect(DB_URL, (err) => {
            if (err) throw err;
            return console.log("DB connected...");
        });
    }
    createServer() {
        this.#app.listen(3500, () => {
            console.log("server started on port 3500 ==>", "http://localhost:3500");
        });
    }
    errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: "Not found",
                success: false,
                data: {},
            });
        });
        this.#app.use((err, req, res, next) => {
            const status = err?.status || 500;
            const message = err?.message || "internal server error";
            return res.status(status).json({
                status,
                message,
                success: false,
                data: {},
            });
        });
    }
    createRoutes() {
        this.#app.use(AppRouter);
        this.#app.get("/", (req, res) => {
            return res.json({
                message: "hello world",
                status: 200,
                success: true,
                data: {},
            });
        });
    }
};
