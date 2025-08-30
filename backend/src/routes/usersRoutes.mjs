import { Router } from "express";
import * as usersController from "../controllers/usersController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
const usersRouter = Router();
usersRouter
  .route("/auth/users")
  .post(usersController.createUser)
  .get(authMiddleware, usersController.getAllUsers);

usersRouter.route("/auth/login").post(usersController.loginUser);

usersRouter
  .route("/auth/user/:id")
  .put(authMiddleware, usersController.updateUser)
  .delete(authMiddleware, usersController.deleteUser);

export default usersRouter;
