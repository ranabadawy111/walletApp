import nodeoutlook from "nodejs-nodemailer-outlook";

export function sendEmail(dest, message) {
  nodeoutlook.sendEmail({
    auth: {
      user: "internationalnew160@gmail.com",
      pass: "international1412",
    },
    from: "internationalnew160@gmail.com",
    to: dest,
    subject: "Hey you, awesome!",
    html: message,
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}

/*
import nodemailer from "nodemailer";

export async function sendToEmail(dest, message){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "internationalnew160@gmail.com",
      pass: "international1412",
    },
  });
  const info = await transporter.sendMail({
    from: "internationalnew160@gmail.com",
    to: dest,
    subject: "hello",
    text: "hello world",
    html: message,
  })
}
*/



