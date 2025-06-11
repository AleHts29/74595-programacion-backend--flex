import config from "../config/config.js";
import twilio from 'twilio';


// Connet
const twilioClient = twilio(config.twilioAccountSID, config.twilioAuthToken)

const twilioData = {
    body: "Esto es un mensaje de pruaba usando Twilio desde NODEJS",
    from: config.twilioSmsNumber, // numero de US que me genera Twilio
    to: config.twilioToSmsMyPhoneNumber
}


export const sendSMS = async (req, res) => {
    try {
        console.log('Enviando SMS using Twilio Account');
        console.log(twilioClient);

        // enviar mensaje
        const result = await twilioClient.messages.create(twilioData)
        res.send({ Status: 'Success', Payload: result })

    } catch (error) {
        console.log("Error al enviar mensaje: ", error);
        res.status(500).send({ error: error })
    }
}



// Usando Whatsapp
// https://www.twilio.com/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates

/*
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     from: 'whatsapp:+15005550006',
     body: 'Hi, Joe! Thanks for placing an order with us. We’ll let you know once your order has been processed and delivered. Your order number is O12235234. Thanks',
     to: 'whatsapp:+14155238886'
   })
  .then(message => console.log(message.sid));
*/

//TODO: Se debe habilitar el Connect to WhatsApp Sandbox
// https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Flearn%3Fx-target-region%3Dus1

