import { CreateSessionDTO } from "../dto/createSessionDTO";
import { TrainingSessionRepository } from "../repositories/sessionRepository";

export class TrainingSessionService {
  constructor(private repository: TrainingSessionRepository) {}

  async createTrainingSession(sessionData: CreateSessionDTO) {
    return await this.repository.create(sessionData);
  }

  async getTrainingSessionById(id: string) {
    return await this.repository.findById(id);
  }

  async deleteTrainingSession(id: string) {
    return await this.repository.deleteById(id);
  }

  async getSessionsByTrainerId(trainerId: string) {
    return await this.repository.findByTrainerId(trainerId);
  }

  async getSessionsByTraineeId(traineeId: string) {
    return await this.repository.findByTraineeId(traineeId);
  }
}
