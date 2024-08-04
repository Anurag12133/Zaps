import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const app = new PrismaClient();
const kafka = new Kafka({
  clientId: "outbox-processes",
  brokers: ["localhost:9092"],
});
const TOPIC_NAME = "zap-events";
async function dummy() {
  const producer = kafka.producer();
  await producer.connect();
  while (1) {
    const pendingData = await app.zapOutbox.findMany({
      take: 10,
    });

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingData.map((r) => ({
        value: r.zapRunId,
      })),
    });
    await app.zapOutbox.deleteMany({
      where: {
        id: {
          in: pendingData.map((x) => x.id),
        },
      },
    });
  }
}
dummy();
