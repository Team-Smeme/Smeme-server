import { Router } from "express";
import { body } from "express-validator";
import { ScrapController } from "../controllers";

const router: Router = Router();

router.post(
  "/",
  [body("diaryId").notEmpty(), body("paragraph").notEmpty()],
  ScrapController.createScrap,
);

router.get("/", ScrapController.getScrapsByUser);

export default router;
