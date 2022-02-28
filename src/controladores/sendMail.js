const nodemailer = require('nodemailer')
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground/'



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
    OAUTH_PLAYGROUND
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
            accesToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Ferreteria Ferretear",
        html: `   <div style="max-width: 700px; margin:auto; border: 10px solid #ddd;">
        <h2 style="text-align: center; text-transform: uppercase; color: teal;">GRACIAS POR PREFERIR NUESTRO SERVICIO</h2>
    <p>Se a creado exitosamente su cuenta! haga click para validarlo</p>    
    <a href="${url}"></a>
        <div>${url}</div>
    </div>`

    }

    smtpTransport.sendMail(mailOptions, (err,infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendMail