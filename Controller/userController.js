const User = require('../Model/UserModel');
const SystemUser = require('../Model/SystemUser')
const moment = require('moment-timezone');
const jwt = require("jsonwebtoken");
const { sendOTP } = require('../util/sendOTP');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');



exports.CreateUser = async (req, res) => {
    const now = moment.tz('Asia/Kolkata');
    console.log(now);

    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    try {
         let profileURL =  gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, true);

        let user = await User.findOne({ email })
        const hashedPassword = await bcrypt.hash(password, 10);

        let otp = Math.floor(Math.random() * 900000) + 100000;
         

        if (!user) {
            user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                confirmPassword: confirmPassword,
                profileURL,
                dateOfJoin: now.format(),
                OTP: otp
            });

            const data = await sendOTP(email, otp);

            // console.log(data);



            await user.save();
            return res.json({
                success:true,
                data:data
            })


        } else {
            // console.log('user exist already')

            return res.json({
                success:false,
                message: 'user exist already',
                data: user
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
                    success: true,
                    data: token
                });
            } else {

            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });

    }

}


exports.Login = async (req, res) => {

    try {
        const { email, password } = req.body;
        // console.log(email);
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
            success: true,
            token,
            data:user
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }

}

exports.updateSystemID = async (req, res) => {
    const now = moment.tz('Asia/Kolkata');
    const { email, systemID } = req.body;
    console.log(email);
    console.log(systemID);

    try {
        let user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }

        if (user.systemID === systemID) {
            return res.json({
                success: false,
                message: "This systemID is already assigned"
            });
        }
        let newUserCreate = new User({
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            dateOfJoin: now.format(),
        })
        newUserCreate.systemID = systemID;
        await newUserCreate.save();

        res.json({
            success: true,
            message: "SystemID updated"
        });
    } catch (error) {
        console.error("Error in updating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.updateBadge = async (req,res)=>{
    try {
       const {email} = req.body;
       const user = await User.findOneAndUpdate({email:email},{badge:"badge 1"});
       let data = await user.save();
       res.json({
        success:true,
        data:data
       })
    } catch (error) {
        
    }
}
exports.updateScore = async (req,res)=>{
    try {
       const {email} = req.body;
       const user = await User.findOneAndUpdate({email:email},{score:20});
       let data = await user.save();
       res.json({
        success:true,
        data:data
       })
    } catch (error) {
        
    }
}

exports.CreateSystemUser = async (req, res) => {
    const { email, systemID } = req.body;
    try {
        if (!email || !systemID) {
            return res.status(400).json({
                success: false,
                message: "Email and systemID are required."
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        let systemUser = new SystemUser({
            userID: user._id,
            systemID
        });

        await systemUser.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: "System user created successfully."
        });
    } catch (error) {
        // Asynchronous error handling
        console.error("Error in creating system user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.allSystemUser = async (req, res) => {
    try {
        let systemUsers = await SystemUser.find().populate('userID', 'email name');
        // Populate 'userID' field with 'email' and 'name' fields from the 'User' model

        res.status(200).json({
            success:true,
            data:systemUsers
        });
    } catch (error) {
        console.error("Error fetching system users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


