var nodemailer = require("nodemailer");
const {email , password} = require("./../credential");
module.exports.send_email = (options) => {
      var transporter = nodemailer.createTransport({
          service:"gmail",
          host: "smtp.gmail.com",
          auth: {
            user: email,
            pass: password
          }
        });

        var mail = {
          from: "PepersDev.co",
          to: options.to,
          subject: options.subject,
          text: options.text
        };

        transporter.sendMail(mail, function(error, info){
          if (error) {
            console.log(error);
          } else {
            // console.log('Email sent: ' + info.response);
          }
        });
}




