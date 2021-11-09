const { Kafka } = require('kafkajs');
const solicitationMail = require('../sendMail');

module.exports = class Consumer {
    consumer;

    constructor({ groupId }) {
        const kafka = new Kafka({
            clientId: 'ms_email',
            brokers: ['host.docker.internal:9094']
        })
        this.consumer = kafka.consumer({ groupId })
    }

    async consume({ topic }) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic, fromBeginning: false });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                solicitationMail(message.value.toString())
            }   
        })
    }
}