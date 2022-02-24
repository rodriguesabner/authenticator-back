import {Router} from "express";
import ProviderController from "../controller/provider.controller";

class ProviderRoute {
    public router: Router;
    private managerController: ProviderController;

    constructor() {
        this.router = Router();
        this.managerController = new ProviderController();
        this.routes();
    }

    routes(){
        this.router.get("/", this.managerController.getAll.bind(this.managerController));
        this.router.delete("/", this.managerController.delete.bind(this.managerController));
    }

}

export default ProviderRoute;