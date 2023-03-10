import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";
import auth from "../middlewares/auth";
const router: Router = Router();

router.patch(
  "/",
  auth,
  [
    body("username").notEmpty().isLength({ min: 2, max: 16 }),
    body("bio").notEmpty(),
  ],
  UserController.updateUserInfo,
);
router.get("/diaries/:diaryId", auth, UserController.getUserDiaryDetail);
router.get("/diaries", auth, UserController.getUserDiaryList);
router.get("/", auth, UserController.getUserInfo);

export default router;
