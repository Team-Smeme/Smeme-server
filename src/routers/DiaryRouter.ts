import { Router } from "express";
import { body } from "express-validator";
import { DiaryController } from "../controllers";
import auth from "../middlewares/auth";

const router: Router = Router();

router.put(
  "/:diaryId",
  auth,
  [
    body("userId").notEmpty(),
    body("isPublic").notEmpty(),
    body("content").notEmpty().isLength({ min: 10 }),
    body("targetLang").notEmpty(),
    body("topic").notEmpty(),
  ],
  DiaryController.updateDiary,
);
router.post(
  "/",
  auth,
  [
    body("content").notEmpty().isLength({ min: 10 }),
    body("targetLang").notEmpty(),
    body("topic").notEmpty(),
    body("isPublic").notEmpty(),
  ],
  DiaryController.createDiary,
);

router.get("/:diaryId", auth, DiaryController.getDiaryById);

router.get("/", auth, DiaryController.getOpenDiaries);

router.delete("/:diaryId", auth, DiaryController.deleteDiary);

router.post(
  "/like",
  auth,
  body("diaryId").notEmpty(),
  DiaryController.getLikeDiary,
);

export default router;
