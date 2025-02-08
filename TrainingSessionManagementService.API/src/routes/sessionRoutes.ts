import { Router } from "express";
import { TrainingSessionRepository } from "../repositories/sessionRepository";
import { TrainingSessionService } from "../services/trainingSession.service";
import { TrainingSessionController } from "../controllers/trainingSession.controller";
import { JwtPayload } from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const repository = new TrainingSessionRepository();
const service = new TrainingSessionService(repository);
const controller = new TrainingSessionController(service);

router.post(
  "/create",
  authMiddleware,
  controller.createTrainingSession.bind(controller)
);
router.get(
  "/:id",
  authMiddleware,
  controller.getTrainingSessionById.bind(controller)
);
router.delete(
  "/:id",
  authMiddleware,
  controller.deleteTrainingSession.bind(controller)
);
router.get(
  "/trainer/:id",
  authMiddleware,
  controller.getSessionByTrainerId.bind(controller)
);
router.get(
  "/trainee/:id",
  authMiddleware,
  controller.getSessionByTraineeId.bind(controller)
);

export default router;
