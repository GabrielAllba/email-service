import { Kafka } from 'kafkajs';

export class KafkaAdminService {
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'email-service-admin',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });
  }

  async createTopicIfNotExists(topicName: string) {
    const admin = this.kafka.admin();
    await admin.connect();

    const topics = await admin.listTopics();
    if (!topics.includes(topicName)) {
      await admin.createTopics({
        topics: [
          {
            topic: topicName,
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
      console.log(`✅ Topic ${topicName} created.`);
    } else {
      console.log(`✅ Topic ${topicName} already exists.`);
    }

    await admin.disconnect();
  }
}
