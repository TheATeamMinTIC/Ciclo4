const nodemailer = require ("nodemailer");


const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2456dbd774214a",
          pass: "c6d0a01136276c"
        }
      });
      const mensaje={
        from: "NOVA <noreply@nova.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
      }
      await transport.sendMail(mensaje)
}

module.exports= sendEmail;