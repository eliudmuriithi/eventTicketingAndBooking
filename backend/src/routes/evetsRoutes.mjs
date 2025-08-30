import { Router } from "express";
import * as eventsController from "../controllers/eventsController.mjs";

const eventsRouter = Router();

eventsRouter
  .route("/events")
  .get(eventsController.getAllEvents)
  .post(eventsController.addEvent);

eventsRouter
  .route("/event/:id")
  .put(eventsController.UpdateEvent)
  .delete(eventsController.deleteEvent);

export default eventsRouter;
