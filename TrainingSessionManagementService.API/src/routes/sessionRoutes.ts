import { Router } from "express";
import { TrainingSessionRepository } from "../repositories/sessionRepository";
import { TrainingSessionService } from "../services/trainingSession.service";
import { TrainingSessionController } from "../controllers/trainingSession.controller";

const router = Router();
const repository = new TrainingSessionRepository();
const service = new TrainingSessionService(repository);
const controller = new TrainingSessionController(service);

router.post("/create", controller.createTrainingSession.bind(controller));
router.get("/:id", controller.getTrainingSessionById.bind(controller));
router.delete("/:id", controller.deleteTrainingSession.bind(controller));
router.get("/trainer/:id", controller.getSessionByTrainerId.bind(controller));
router.get("/trainee/:id", controller.getSessionByTraineeId.bind(controller));

export default router;
