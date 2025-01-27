import { CreateSessionDTO } from "../dto/createSessionDTO";
import { SessionResponseDTO } from "../dto/sessionResponseDTO";
import { TrainingSession } from "../entities/trainingSession";

export class SessionMapper {
  static mapToCreateSessionDTO(rawData: any): CreateSessionDTO {
    return {
      TrainerId: rawData.TrainerId,
      TraineeId: rawData.TraineeId,
      SessionDate: rawData.SessionDate,
      SessionTime: rawData.SessionTime,
      SessionOutcome: rawData.SessionOutcome,
    };
  }

  static mapToSessionResponseDTO(session: TrainingSession): SessionResponseDTO {
    return {
      TrainingSessionId: session.TrainingSessionId,
      TrainerId: session.TrainerId,
      TraineeId: session.TraineeId,
      SessionDate: session.SessionDate,
      SessionTime: session.SessionTime,
      SessionOutcome: session.SessionOutcome,
    };
  }
}
