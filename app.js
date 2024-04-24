const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
require('dotenv').config();

const getTgMessade = require('./utils/getTgMessade');
const sendToTg = require('./utils/sendToTg');
const getEmailMessage = require('./utils/getEmailMessage');


app.use(cors({
  origin: 'https://www.xxxxxx.com', // use your actual domain name (or localhost), using * is not recommended
  // optionsSuccessStatus: 200,
}))
app.options('/booking', cors());

app.use(express.json({ limit: "150mb" }));


app.get('/', (req, res) => {
  res.send('HI server is working 2')
})


function requestBodyObject(body) {
  return {
    ...body,
    tattooImgArray: body.tattooImgArray.map((file) => {
      return { ...file, url: `file length: ${file.url.length}` };
    }),
  };
}


app.post("/sent", async function (request, result) {

  try {
    let output = getEmailMessage(request);

    // example with Google
    //GOOGLE Authentification    work only in test mode
    // const accessToken = OAuth2_client.getAccessToken();
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: 'OAuth2',
    //     user: process.env.EMAIL,
    //     clientId: process.env.CLIENT_ID,
    //     clientSecret: process.env.CLIENT_SECRET,
    //     refreshToken: process.env.REFRESH_TOKEN,
    //     accessToken: accessToken
    //   },
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
    
    
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // STARTTLS// true for 465, false for other ports
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let mailOptions = {
      from: "xxxxxx@outlook.com",
      to: "xxxxxx@gmail.com", 
      replyTo: `${request.body.email}`,
      subject: `${request.body.firstName} ${request.body.lastName}`,
      text: "profile below",
      html: output,
      attachments: request.body.tattooImgArray.map((file) => {
        return {
          filename: file.title,
          content: file.url.split("base64,")[1],
          encoding: "base64",
        };
      }),
    };
    // SENT email with GOOGLE
    const info = await transporter.sendMail(mailOptions);
    let emailSent = {
      text: "Email sent",
      profile: requestBodyObject(request.body),
      info: info,
    };

    const tgMessage = getTgMessade(emailSent);
    await sendToTg(tgMessage)
    // response to front end
    result.json(emailSent)
  } catch (error) {
    let errorInfo = {
      text: "ERROR",
      message: error,
      profile: request.body,
      // info: info,
    };
    console.log(error, 'CATCH ERROR')
    const errorMessage = `
    Error sending email:Code: ${error?.code}\n
    Command: ${error?.command}\n
    Message: ${error?.message}\n
  `;
    
    await sendToTg(errorMessage)
    result.json(errorInfo)
  }

});


app.listen(3001, () => {
  console.log("server started...");
});

