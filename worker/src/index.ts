import { Kafka } from "kafkajs";
import { isYieldExpression } from "typescript";

const kafka = new Kafka({
  clientId: "outbox-processes",
  brokers: ["localhost:9092"],
});
const TOPIC_NAME = "zap-events";
const consumer = kafka.consumer({ groupId: "zap-processes" });

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
