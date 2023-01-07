import { Router } from "express";
import { body } from "express-validator";
import { DiaryController } from "../controllers";

const router: Router = Router();

router.put("/:diaryId", DiaryController.updateDiary);
router.post(
  "/",
  [
    body("content").notEmpty().isLength({ min: 10 }),
    body("targetLang").notEmpty(),
    body("category").notEmpty(),
    body("topic").notEmpty(),
    body("isPublic").notEmpty(),
  ],
  DiaryController.createDiary,
);

router.get("/:diaryId", DiaryController.getDiaryById);

router.get("/", DiaryController.getOpenDiaries);

router.delete("/:diaryId", DiaryController.deleteDiary);

router.post("/like", body("diaryId").notEmpty(), DiaryController.getLikeDiary);

export default router;
