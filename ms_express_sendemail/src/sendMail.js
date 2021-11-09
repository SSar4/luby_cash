const Email = require('email-templates');
const moment = require('moment');
const ejs = require('ejs')
const path = require('path');

require('dotenv').config()

const email = new Email({
  message: {
    from: process.env.PLATAFORM_EMAIL
  },
  send: true,
  transport: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    ssl: false,
    tls: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  }
});

module.exports = async (variables) => {
  if (!variables) return;
  const messageJSON = JSON.parse(variables);
  console.log(messageJSON.dataValues)
  console.log(messageJSON.pass)
  var views = path.join(__dirname, 'views');
  var filepath = path.join(views, 'solicitation' + '.ejs');

   ejs.renderFile(filepath,{
     pass:messageJSON.pass || null,
     data:messageJSON.dataValues}, function (err, data){
    if(err){
        console.log(err)
        return err
    }
    email
    .send({
      message: {
        to: messageJSON.dataValues.email,
        subject: `resultado da sua analise de dados`,
        html: data
      }
    })
    .then(console.log('success'))
    .catch(console.error);
  })
   
   
  
}