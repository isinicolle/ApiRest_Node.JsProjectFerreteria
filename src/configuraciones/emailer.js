const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "51d6cd77aa8f0d",
      pass: "18832c1078e9b4"
    }
  });

 const sendMail = async () => 
 {
   const transporter = nodemailer.createTransport()
   const info = await transport.sendMail(
    {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", 
        subject: "Ferreteria Ferretear",
        html: `   <div style="max-width: 700px; margin:auto; border: 10px solid #ddd;">
        <h2 style="text-align: center; text-transform: uppercase; color: teal;">GRACIAS POR PREFERIR NUESTRO SERVICIO</h2>
    <p>Se a creado exitosamente su cuenta!</p>    
    <p>Se a creado exitosamente su cuenta! haga click para validarlo</p>    
    </div>`
    
    }
   )
 }

 exports.sendMail = () => sendMail()