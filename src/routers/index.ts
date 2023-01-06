import { Router } from "express";
import DiaryRouter from "./DiaryRouter";

const router: Router = Router();

router.use("/diaries", DiaryRouter);

export default router;
