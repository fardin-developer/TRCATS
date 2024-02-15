const User = require('../Model/UserModel');
const moment = require('moment-timezone');
const jwt = require("jsonwebtoken");
const { sendOTP } = require('../util/sendOTP');
const bcrypt = require('bcrypt');


exports.CreateUser = async (req, res) => {
    const now = moment.tz('Asia/Kolkata');
    console.log(now);

    const { name, email, password, confirmPassword } = req.body
    try {
        let user = await User.findOne({ email })
        const hashedPassword = await bcrypt.hash(password, 10);

        let otp = Math.floor(Math.random() * 900000) + 100000;

        if (!user) {
            user = new User({
                name: name,
                email: email,
                password: hashedPassword,
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


exports.VerifyOtp = async (req, res) => {
    try {
        let { email, otp } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            if (user.OTP === otp) {
                const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                res.status(200).json({ 
                    success:true,
                    data:token
                 });
            }else{
                
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });

    }
   
}


exports.Login = async(req,res)=>{

    try {
        const { email, password } = req.body;
        console.log(email);
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '24000h',
        });
        res.status(200).json({ 
            success:true,
            token });
        } catch (error) {
        res.status(500).json({ error: 'Login failed' });
        }
        
}

exports.UpdateUser = async (req,res)=>{
    console.log(req.body.name);
}
