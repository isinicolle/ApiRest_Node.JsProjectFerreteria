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
        from: 'ferreteriaferretear@gmail.com', // sender address
        to: `${correo}`, 
        subject: "Ferreteria Ferretear",
        html: htmlt,
    
    }
   );

   console.log("Message sent: %s " , info.messageId)

   return
 }

 exports.sendMailPassword = (correo,clave) => sendMailPassword(correo)

 const sendMailPassword = async (correo,clave) => 
 {
   const info = await transport.sendMailPassword(
    {
        from: 'ferreteriaferretear@gmail.com', // sender address
        to: `${correo}`, 
        subject: "Ferreteria Ferretear",
        html: `   <div style="max-width: 700px; margin:auto; border: 10px solid #ddd;">
        <h2 style="text-align: center; text-transform: uppercase; color: teal;">Recuperar clave</h2>
        <p>Su nueva clave es la siguiente: </p>    
        <p>Inicie sesion en su cuenta con la siguiente clave: ${clave} </p>    
        </div>`,
    
    }
   );

   console.log("Message sent: %s " , info.messageId)

   return
 }

 exports.sendMailPassword = (correo,clave) => sendMailPassword(correo,clave)