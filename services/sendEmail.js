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
