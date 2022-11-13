const nodemailer = require ("nodemailer");


const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "dev2022@outlook.es",
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