import { Router } from "express";
import { Response } from "express";
import testController from "../controllers/TestController";
import { success } from "../utils/response";

const router: Router = Router();

router.get("/", testController.getTest);

export default router;
