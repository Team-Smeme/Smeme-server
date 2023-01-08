import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
import auth from "../middlewares/auth";
const router: Router = Router();

router.patch(
  "/",
  [
    body("username").notEmpty().isLength({ min: 2, max: 16 }),
    body("bio").notEmpty(),
  ],
  UserController.updateUserInfo,
);
router.get("/diaries/:diaryId", auth, UserController.getUserDiaryDetail);
router.get("/diaries", UserController.getUserDiaryList);
router.get("/", UserController.getUserInfo);

export default router;
