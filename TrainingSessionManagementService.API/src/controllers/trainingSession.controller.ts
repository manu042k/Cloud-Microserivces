import { Request, Response } from "express";
import { TrainingSessionService } from "../services/trainingSession.service";
import { TrainingSession } from "../entities/trainingSession";

export class TrainingSessionController {
  constructor(private service: TrainingSessionService) {}

  async createTrainingSession(req: Request, res: Response) {
    // try {
    //   const session = await this.service.createTrainingSession(req.body);
    //   res.status(201).json(req.body);
    // } catch (error) {
    //   res.status(500).json({ error: (error as any).message });
    // }

    try {
      console.log("req", req.body);
      const session = TrainingSession.create(req.body);

      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  async getTrainingSessionById(req: Request, res: Response) {
    try {
      const session = await this.service.getTrainingSessionById(req.params.id);
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).json({ message: "Training session not found." });
      }
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  async deleteTrainingSession(req: Request, res: Response) {
    try {
      await this.service.deleteTrainingSession(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  async getSessionByTrainerId(req: Request, res: Response) {
    try {
      const sessions = await this.service.getSessionsByTrainerId(req.params.id);
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  async getSessionByTraineeId(req: Request, res: Response) {
    try {
      const sessions = await this.service.getSessionsByTraineeId(req.params.id);
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }
}
