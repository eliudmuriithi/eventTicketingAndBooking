import { Router } from "express";
import * as venuesController from "../controllers/venuesController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const venuesRouter = Router();

venuesRouter
  .route("/venues")
  .get(venuesController.getAllVenues)
  .post(authMiddleware, venuesController.addVenue);

venuesRouter
  .route("/venue/:id")
  .put(authMiddleware, venuesController.updateVenue)
  .delete(authMiddleware, venuesController.deleteVenue);

export default venuesRouter;
