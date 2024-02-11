const User = require('../Model/UserModel')
const moment = require('moment-timezone');
const { sendOTP } = require('../util/sendOTP')

exports.CreateUser = async (req, res) => {
    const now = moment.tz('Asia/Kolkata')

    const { name, email, password, confirmPassword } = req.body
    console.log(name);
    try {
        let user = await User.findOne({ email })
        // console.log(now.format())
        let otp = Math.floor(Math.random() * 900) + 100;

        if (!user) {
            user = new User({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                dateOfJoin: now.format(),
                OTP: otp
            });

            const data = await sendOTP(email, otp);

            console.log(data);



            await user.save();
            return res.json(data)


        } else {
            console.log('user exist already')

            return res.json({
                data: 'user exist already',
                user: user
            })
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            data: "Something went wrong"
        });
    }

}
