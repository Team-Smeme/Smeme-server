import { Router } from "express";
import { userController } from "../controllers";

const router: Router = Router();

router.patch("/", userController.updateUserInfo);

export default router;
