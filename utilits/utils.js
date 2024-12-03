const nodemailer = require("nodemailer");


const transport = (senderEmail, password) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth:{
          user:senderEmail,
          pass:password,
      }
    });
    return transporter
  };
  
  const mailSender =(req,res,trans,mailoptions)=>{
      trans.sendMail(mailoptions,(err)=>{
          if(err){
              console.log("Technical Issue",err);
              res.redirect("/registerpage")
          }else{
            req.flash("A Verfication Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...")
            res.redirect("/loginpage")
          }
      })
  }

  module.exports = {
    transport,
    mailSender
  }