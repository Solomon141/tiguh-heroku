const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// const MailLinkURL = process.env.MailLinkURL

async function SendConfirmationMail(toEmail, vkey) {
  let transporter = nodemailer.createTransport({
    host: "badregplc.com",
    port: 465,
    secure: true,
    auth: {
      user: "badreg_info@badregplc.com",
      pass: "@#B@dreg123",
    },
  });

  let info = await transporter.sendMail({
    from: "badreg_info@badregplc.com",
    to: [toEmail],
    subject: "Confirm Registration",
    text: "a company you will like forever?",
    html: `<div> 
             <h3> Confirm Your Account </h3>
             <p> Thanks for signing up to BadregPLC! You must follow this link within 3 days of registration to activate your account. <p/>
             <a href="https://solomon.badregplc.com/verify/${vkey}">Click this link to verify</a> &nbsp; || &nbsp;
             <a href="http://solomon.badregplc.com/verify/${vkey}">Click this link to verify</a>
             <p> Have fun, and don't hesitate to contact us with your feedback. </p>
             <Image src="https://static.callbell.eu/uploads/widget_configuration/brand_image/91080/Logo.jpg" />
             <p> The Badreg PLC IT Department! </p>
             <p> https://www.badregplc.com </p>
         </div>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = SendConfirmationMail;
