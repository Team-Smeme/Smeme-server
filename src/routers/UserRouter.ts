import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();

router.patch("/", UserController.updateUserInfo);
router.get("/diaries/:diaryId", UserController.getUserDiaryDetail);
router.get("/diaries", UserController.getUserDiaryList);
router.get("/", UserController.getUserInfo);

export default router;
