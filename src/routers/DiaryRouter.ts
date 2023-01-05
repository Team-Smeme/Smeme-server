import { Router } from "express";
import { body } from "express-validator";
import diaryController from "../controllers/DiaryController";

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
  diaryController.createDiary,
);

// 게시판 조회

// 게시판 일기 상세 조회

// 게시판 일기 추천

export default router;
