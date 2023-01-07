import { Router } from "express";
import { AuthController } from "../controllers";
import { body } from "express-validator";

const router: Router = Router();

router.post("/", [body("social").notEmpty()], AuthController.signIn);
router.get("/token", AuthController.getToken);

export default router;
