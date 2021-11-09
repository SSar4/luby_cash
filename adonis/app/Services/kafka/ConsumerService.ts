import { Kafka, Consumer } from 'kafkajs'
import HandleApprovedService from 'App/Services/Kafka/HandleApprovedService'

class ConsumerService {
  private consumer: Consumer

  constructor() {
    const kafka = new Kafka({
      clientId: 'luby_cash_consumer',
      brokers: ['host.docker.internal:9094'],
    })

    this.consumer = kafka.consumer({ groupId: 'adonisClientApproved' })
  }

  public async execute(topic: string, fromBeginning: boolean) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        await HandleApprovedService.execute(JSON.parse(String(message.value)))
      },
    })
  }
}

export default new ConsumerService()
