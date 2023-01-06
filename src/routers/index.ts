import { Router } from "express";
import diaryRouter from "./DiaryRouter";

const router: Router = Router();

router.use("/diaries", diaryRouter);

export default router;
