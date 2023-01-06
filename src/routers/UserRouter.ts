import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();

router.patch("/", UserController.updateUserInfo);
router.get("/diaries/:diaryId", userController.getUserDiaryDetail);
router.get("/", userController.getUserInfo);

export default router;
