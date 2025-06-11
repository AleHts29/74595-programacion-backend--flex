import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../util.js';

// Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})

// verificar conexion con gmail
transporter.verify(function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server SMTP is ready to take our message');
    }
})



const mailOptions = {
    from: `Coder Test ${config.gmailAccount}`,
    to: config.gmailAccount,
    subject: "Correo de prueba CoderHouse - programacion BackEnd",
    html: "<div><h1>Esto es un Test de envio de correos con Nodemailer!</h1></div>",
    attachments: []
}

// sendEmail
export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(error);
                return res.status(400).send({ message: "Error", payload: error });
            }

            console.log(`Message sent: %s`, info.messageId);
            res.send({ status: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}



const mailOptionsWithAttachments = {
    from: `Coder Test ${config.gmailAccount}`,
    to: config.gmailAccount,
    subject: "Correo de prueba CoderHouse - programacion BackEnd",
    html: `<div>
                <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Ahora usando imagenes: </p>
                <img src="cid:meme"/>
            </div>`,
    attachments: [
        {
            filename: 'Meme de programacion',
            path: __dirname + "/public/images/meme.png",
            cid: 'meme'
        }
    ]
}

// sendEmailWithAttachments
export const sendEmailWithAttachments = (req, res) => {
    try {
        transporter.sendMail(mailOptionsWithAttachments, (err, info) => {
            if (err) {
                console.log(error);
                return res.status(400).send({ message: "Error", payload: error });
            }

            console.log(`Message sent: %s`, info.messageId);
            res.send({ status: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}