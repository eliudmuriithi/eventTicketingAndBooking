import { Router } from "express";
import usersRouter from "./usersRoutes.mjs";
import venuesRouter from "./venuesRoutes.mjs";
import eventsRouter from "./evetsRoutes.mjs";
import categoriesRouter from "./categoriesRouetes.mjs";

const router = Router();

router.use(usersRouter);
router.use(venuesRouter);
router.use(eventsRouter);
router.use(categoriesRouter);

export default router;
