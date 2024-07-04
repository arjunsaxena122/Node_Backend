import nodemailer from "nodemailer"
import { generateOtp } from "./otp.controllers.js";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_EMAIL_ID,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendMailer= async (req,res)=>{
    const {email,subject,message} = req.body;

    const OTP = generateOtp()

    let mailOptions ={
        from:process.env.USER_EMAIL_ID,
        to:email,
        subject:subject,
        text:`${message} This is your otp ${OTP} `
    }

    console.log(mailOptions)

    transporter.sendMail(mailOptions,function(error){
        if(error){
            console.log(error)
        }
        return res.status(200).json({
            message:"Email sent successfully"
        })
    })

}