import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();

router.patch("/", UserController.updateUserInfo);

export default router;
