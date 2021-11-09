import { Kafka, Producer, Message } from "kafkajs";

interface ConsumerConfig {
  groupId: string;
}

interface SendParams {
  topic: string;
  value: Message["value"];
}

export default class KafkaProducer {
  public producer: Producer;

  constructor({ groupId }: ConsumerConfig) {
    const kafka = new Kafka({
      clientId: "ms_averugue",
      brokers: ["host.docker.internal:9094"],
    });
    this.producer = kafka.producer();
  }

  async send({ topic, value }: SendParams) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [
        {
          value,
        },
      ],
    });
    await this.producer.disconnect();
  }
}
