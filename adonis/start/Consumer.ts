/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import ConsumerService from 'App/Services/Kafka/ConsumerService'
console.log('init---------------------------------------------')
ConsumerService.execute('client_approved_adonis', true).then(() => console.log('Consumer ready'))
