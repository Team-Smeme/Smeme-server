import { Router } from "express";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import DiaryRouter from "./DiaryRouter";
import ScrapRouter from "./ScrapRouter";
import TestRouter from "./TestRouter";

const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/diaries", DiaryRouter);
router.use("/scraps", ScrapRouter);
router.use("/test", TestRouter);

export default router;
