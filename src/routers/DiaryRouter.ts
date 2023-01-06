import { Router } from "express";
import { body } from "express-validator";
import diaryController from "../controllers/DiaryController";

const router: Router = Router();

router.put("/:diaryId", diaryController.updateDiary);
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
  diaryController.createDiary,
);

router.delete("/:diaryId", diaryController.deleteDiary);
export default router;
