import { Router } from "express";
import { CategoryController } from "../controllers";

const router: Router = Router();

router.get("/topic", CategoryController.getTopics);
router.get("/", CategoryController.getCategories);

export default router;
