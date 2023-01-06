import { Router } from "express";
import { authController } from "../controllers";

const router: Router = Router();

router.post("/", authController.signIn);
router.get("/token", authController.getToken);

export default router;
