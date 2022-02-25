import express, {Application} from "express";
import OTPController from "../controllers/otp.controller";
import OtpRoute from "./otp.route";
import ProviderRoute from "./provider.route";

class Routes {
    public app: Application;

    constructor() {
        this.app = express();

        this.routes();
    }

    routes(){
        this.app.use("/otp", new OtpRoute().router);
        this.app.use("/provider", new ProviderRoute().router);
    }
}

export default Routes;