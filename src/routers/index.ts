import { Router } from "express";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import diaryRouter from "./DiaryRouter";

const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/diaries", diaryRouter);

export default router;
