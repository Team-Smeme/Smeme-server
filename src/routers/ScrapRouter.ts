import { Router } from "express";
import { body } from "express-validator";
import { ScrapController } from "../controllers";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post(
  "/",
  auth,
  [body("diaryId").notEmpty(), body("paragraph").notEmpty()],
  ScrapController.createScrap,
);

router.get("/", ScrapController.getScrapsByUser);

export default router;
