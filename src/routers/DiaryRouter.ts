import { Router } from "express";
import { body } from "express-validator";
import { DiaryController } from "../controllers";

const router: Router = Router();

router.post(
  "/",
  [
    body("userId").notEmpty(),
    body("content").notEmpty().isLength({ min: 10 }),
    body("targetLang").notEmpty(),
    body("category").notEmpty(),
    body("topic").notEmpty(),
    body("isPublic").notEmpty(),
  ],
  DiaryController.createDiary,
);

router.delete("/:diaryId", DiaryController.deleteDiary);
export default router;
