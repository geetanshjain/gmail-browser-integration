/**
 * Created by dell on 1/13/2018.
 */

var twilio = require('twilio');
var client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.CELL_PHONE_NUMBER,
    body: "SMS from Node.js using Twilio!"
}).then((messsage) => console.log(message.sid));