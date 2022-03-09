import nodemailer from "nodemailer";

export const sendEmail = (userEmail, hash) => {
  console.log("CALLING EMAIL");
  const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    // service: "SendGrid",
    auth: {
      user: process.env.GOOGLE_USERNAME,
      pass: process.env.GOOGLE_PASSWORD,
    },
    secure: false,
  });

  console.log("TRANSPORTER DONE ");

  const mailData = {
    from: "saglanivatsal@gmail.com",
    to: userEmail,
    subject: "Welcome to ArxivOne. Activate your account",
    html: `
      <div style="margin:auto; padding:10px;">
      Hi,
      <p>Please tap on the <a href="http://localhost:1234/activate?x=${hash}" >link</a> to activate your account</p>
      </div>
      `,
  };
  console.log("MAIL DATA DONE");

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log("ERROR: ", err);
      //   return false;
    } else {
      console.log("INFO: ", info);
      //   return true;
    }
  });
  return true;
};
