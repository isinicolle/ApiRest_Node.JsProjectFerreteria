const nodemailer = require('nodemailer')
const {google} = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const {OAuth2} = google.auth;



const {
    MAILING_SERVICE_CLIENT_ID ,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oAuth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID ,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
)

const sendMail = (to,url) => {
    oAuth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accesToken = oAuth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth:
        {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Ferreteria Ferretear",
        html: `   <div style="max-width: 700px; margin:auto; border: 10px solid #ddd;">
        <h2 style="text-align: center; text-transform: uppercase; color: teal;">GRACIAS POR PREFERIR NUESTRO SERVICIO</h2>
    <p>Se a creado exitosamente su cuenta!</p>    
    </div>`

    }

    smtpTransport.sendMail(mailOptions, (error,infor) => {
        if(error) return error;
        return infor
    })
}

module.exports = sendMail