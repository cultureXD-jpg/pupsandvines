import { Router, type IRouter } from "express";
import healthRouter from "./health";
import wineriesRouter from "./wineries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(wineriesRouter);

export default router;
