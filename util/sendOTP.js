const nodemailer = require("nodemailer");

exports.sendOTP = (email, OTP) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "anotherlogin99@gmail.com",
                pass: "ybtz dwze zjgb riyr"
            }
        });
        
        const mailOptions = {
            from: "anotherlogin99@gmail.com",
            to: email, 
            subject: "Your OTP", 
            text: `Your OTP is: ${OTP}` 
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
                reject(error); 
            } else {
                resolve('OTP sent successfully'); 
            }
        });
    });
};
