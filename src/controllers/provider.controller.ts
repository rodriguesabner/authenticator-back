import {Request, Response} from "express";
import ProviderService from "../services/provider.service";

class ProviderController {
    private managerService: ProviderService;

    constructor() {
        this.managerService = new ProviderService();
    }

    async getAll(req: Request, res: Response) {
        const ret = await this.managerService.getAll();
        return res.status(200).json(ret);
    }

    async delete(req: Request, res: Response) {
        const {issuer, label}: any = req.query;

        const ret = await this.managerService.delete(issuer, label);
        return res.status(200).json(ret);
    }
}

export default ProviderController;