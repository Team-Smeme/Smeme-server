import { Router } from "express";
import authRouter from "./AuthRouter";
import userRouter from "./UserRouter";
import diaryRouter from "./DiaryRouter";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/diaries", diaryRouter);

export default router;
