import { Router } from "express";
import { AuthController } from "../controllers";
import { body, header } from "express-validator";

const router: Router = Router();

router.post(
  "/",
  [body("social").notEmpty(), header("authorization").notEmpty()],
  AuthController.signIn,
);
router.get("/token", AuthController.getToken);

export default router;
