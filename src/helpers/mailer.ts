import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
      const hasedToken = await bcryptjs.hash(userId.toString(),10) 
      // await User.findByIdAndUpdate(userId,{verifyToken:hasedToken,resetPasswordExpiry:Date.now()+3600000})
      if(emailType==="VERIFY")
        await User.findByIdAndUpdate(userId,{verifyToken:hasedToken,verifyTokenExpiry:Date.now()+3600000})
      else if(emailType==="RESET")
        await User.findByIdAndUpdate(userId,{forgotPasswordToken:hasedToken,forgotPasswordTokenExpiry:Date.now()+3600000})

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9b5ae07ae1dedd",
          pass: "0e968a049c0b6c"
        }
      });

      const mailOptions = {
        from:'kumarshresth2004@gmail.com',
        to:email,
        subject:emailType==="VERIFY"?"Verify your email":"Reset your password",
        html:`<p>Click <a href='http://localhost:3000/verifyemail?token=${hasedToken}'here</a> to ${emailType==="VERIFY"?"Verify your email":"Reset your password"} 
        or copy and paste the same value in your browser.
        </br>
        http://localhost:3000/verifyemail?token=${hasedToken}
        </p>`
      }

      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse
      
    } catch (error:any) {
        throw new Error(error.message)
    }
}