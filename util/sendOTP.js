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
            to: email, // use the provided email instead of hardcoded one
            subject: "Your OTP", // customize subject if needed
            text: `Your OTP is: ${OTP}` // include OTP in the email body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
                reject(error); // reject the promise if there's an error
            } else {
                resolve('OTP sent successfully'); // resolve the promise if email sent successfully
            }
        });
    });
};
