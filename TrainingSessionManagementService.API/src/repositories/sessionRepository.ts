import { TrainingSession } from "../entities/trainingSession";

export class TrainingSessionRepository {
  async create(session: Partial<TrainingSession>) {
    return await TrainingSession.create(session);
  }

  async findById(id: string) {
    return await TrainingSession.findByPk(id);
  }

  async deleteById(id: string) {
    return await TrainingSession.destroy({ where: { TrainingSessionId: id } });
  }

  async findByTrainerId(trainerId: string) {
    return await TrainingSession.findAll({ where: { TrainerId: trainerId } });
  }

  async findByTraineeId(traineeId: string) {
    return await TrainingSession.findAll({ where: { TraineeId: traineeId } });
  }
}
