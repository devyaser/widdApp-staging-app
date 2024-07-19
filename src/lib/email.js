import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

export const sendEmail = (email, uniqueString) => {
  var Transport = nodemailer.createTransport(
    smtpTransport({
      // service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secureConnection: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD, //and your password here);
      },
    })
  );
  let sender = "Admin";
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Email confirmation",
    html: `Verification Code: ${uniqueString}<br>
    Press <a href=${process.env.NEXTAUTH_URL}/verify>here<a> to verify your email. Thanks`,
  };
  return new Promise(function (resolve, reject) {
    Transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        resolve({ error });
      } else {
        resolve("success");
      }
    });
  });
};

export const randstring = () => {
  //considering a 8 length string
  const len = 8;
  let randstr = "";
  for (let i = 0; i < len; i++) {
    //ch = a number between 1 to 10
    const ch = Math.floor(Math.random() * 10 + 1);
    randstr += ch;
  }
  return randstr;
};
