const nodemailer = require('nodemailer')
const htmlt = `   <div style="max-width: 700px; margin:auto; border: 10px solid #ddd;">
<h2 style="text-align: center; text-transform: uppercase; color: teal;">GRACIAS POR PREFERIR NUESTRO SERVICIO</h2>
<p>Se a creado exitosamente su cuenta!</p>    
<p>Puedes iniciar sesion en tu cuenta no requiere de una acivacion previa</p>    
</div>`

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "51d6cd77aa8f0d",
      pass: "18832c1078e9b4"
    }
  });

 const sendMail = async (correo) => 
 {
   const info = await transport.sendMail(
    {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: `${correo}`, 
        subject: "Ferreteria Ferretear",
        html: htmlt,
    
    }
   );

   console.log("Message sent: %s " , info.messageId)

   return
 }

 exports.sendMail = (correo) => sendMail(correo)