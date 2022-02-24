import {Router} from "express";
import OtpController from "../controller/otp.controller";

class OtpRoute {
    public router: Router;
    private otpController: OtpController

    constructor() {
        this.router = Router();
        this.otpController = new OtpController();
        this.routes();
    }

    routes(){
        this.router.get("/parse", this.otpController.parse.bind(this.otpController))
        this.router.post("/validate", this.otpController.validate.bind(this.otpController));
        this.router.post("/create", this.otpController.createTotp.bind(this.otpController));
        this.router.post("/generate-code", this.otpController.generateTotp.bind(this.otpController));
    }
}

export default OtpRoute;