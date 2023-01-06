import { Router } from "express";
import { AuthController } from "../controllers";

const router: Router = Router();

router.post("/", AuthController.signIn);
router.get("/token", AuthController.getToken);

export default router;
