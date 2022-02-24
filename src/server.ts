import express from "express";
import cors from "cors";
import Routes from "./routes";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }

    config() {
        this.app.use(express.json({limit: "25mb"}));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static(__dirname + "/files"));
        this.app.use(cors({origin: "*"}));
    }

    routes() {
        this.app.use("", new Routes().app);
    }

}

export default new Server().app;