import { producer } from "../config/kafka";

export class KafkaPublisher {
  public async sendVerificationRequest(userId: string, role: string) {
    await producer.connect();
    await producer.send({
      topic: "user-verification-topic",
      messages: [
        {
          key: userId,
          value: JSON.stringify({ userId, role }),
        },
      ],
    });
  }
}
