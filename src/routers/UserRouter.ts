import { Router } from "express";
import { userController } from "../controllers";

const router: Router = Router();

router.patch("/", userController.updateUserInfo);
router.get("/diaries/:diaryId", userController.getUserDiaryDetail);
router.get("/", userController.getUserInfo);

export default router;
