const express = require('express')
const Consumer = require('./KafkaService/Consumer');
const dotenv = require('dotenv');
const engines = require('consolidate');
const path = require('path')
const app = express()
dotenv.config();

const consumer1 = new Consumer({ groupId: 'sendClientApproved' });
const consumer2 = new Consumer({ groupId: 'sendClientDesapproved' });

async function run() {

  await consumer1.consume({ topic: 'client_approved' });
  await consumer2.consume({ topic: 'client_desapproved'});

  const port = 3001;
  //For render views
  app.set('view engine', 'ejs');
  app.set('views', './views');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


}

run().catch(console.error)

