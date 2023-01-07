import { Router } from "express";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import DiaryRouter from "./DiaryRouter";
import ScrapRouter from "./ScrapRouter";

const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/diaries", DiaryRouter);
router.use("/scraps", ScrapRouter);

export default router;
