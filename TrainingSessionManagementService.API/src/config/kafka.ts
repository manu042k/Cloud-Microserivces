import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "training-session-service",
  brokers: ["kafka:9093"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "user-validation-group" });

export { kafka, producer, consumer };
