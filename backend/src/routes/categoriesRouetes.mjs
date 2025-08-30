import { Router } from "express";
import * as categoryControllers from "../controllers/categoriesController.mjs";

const categoriesRouter = Router();

categoriesRouter
  .route("/categories")
  .get(categoryControllers.getAllCategories)
  .post(categoryControllers.addCategory);

categoriesRouter
  .route("/category/:id")
  .put(categoryControllers.updateCategory)
  .delete(categoryControllers.deleteCategory);

export default categoriesRouter;
