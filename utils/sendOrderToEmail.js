const nodemailer = require('nodemailer');
const translation = require('./mailTranslation');
const createMailHTML = require('./createMailHTML');

module.exports = (data, totalPrice) => {

    const mailLanguage = data.mailLanguage || 'uk';

   const html = createMailHTML(data, totalPrice, mailLanguage)

    const transporter = nodemailer.createTransport({
        name: "smtp.gmail.com",
        host: "smtp.gmail.com",
        secure: false,
        port: 587,
        auth: {
            user: 'vinorosend@gmail.com',
            pass: 'mtvyrpibtzlkpoec'
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: 'vinorosend@gmail.com',
            to: `vinorosend@gmail.com, grigovlad09112002@gmail.com, ${data.email}`,
            subject: `vinoro.shop - ${translation[mailLanguage].Order} №1652110161250 ${translation[mailLanguage].confirmed}!`,
            html: html
        }, function(error, info){
            if (error) {
             console.log(error);
             resolve({ error, data: info })
            } else {
             console.log('Email sent: ' + info.response);
                resolve({ data: info })
            }
        });
    })
}

