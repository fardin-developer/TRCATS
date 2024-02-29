const User = require('../Model/UserModel');
const SystemUser = require('../Model/SystemUser')
const moment = require('moment-timezone');
const jwt = require("jsonwebtoken");
const { sendOTP } = require('../util/sendOTP');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');


exports.CreateUser = async (req, res) => {
    const now = moment.tz('Asia/Kolkata');

    const { name, email, password, confirmPassword } = req.body;
    try {
        let profileURL = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);

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




            await user.save();
            return res.json({
                success: true,
                data: data
            })


        } else {
            // console.log('user exist already')

            return res.json({
                success: false,
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
                    expiresIn: '7d',
                });
                res.status(200).json({
                    success: true,
                    data: token
                });
            } else {
                res.status(200).json({
                    success: false,
                    data: "wrong otp"
                });
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
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
                error: 'Invalid credentials'
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
                error: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '15d'
        });
        res.status(200).json({
            success: true,
            token,
            data: user
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

exports.updateBadge = async (req, res) => {
    try {
        const { email, badge } = req.body;
        const user = await User.findOneAndUpdate({ email: email }, { badge: badge });
        let data = await user.save();
        data.badge = badge
        res.json({
            success: true,
            data: data
        })
    } catch (error) {
        res.json({
            success: false,
            data: "something wrong"
        })
    }
}
exports.updateBadgeAll = async (req, res) => {
    try {
        const { data } = req.body;
        for (const item of data) {
            const { email, badge } = item;
            let updateddata = await User.findOneAndUpdate({ email: email }, { badge: badge });
        }

        res.json({
            success: true,
            message: `Badges updated successfully`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


exports.updateScore = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOneAndUpdate({ email: email }, { score: 20 });
        let data = await user.save();
        res.json({
            success: true,
            data: data
        })
    } catch (error) {

    }
}

exports.updateScoreAll = async (req, res) => {
    try {
        const { data } = req.body;
        for (const item of data) {
            const { email, score } = item;
            await User.findOneAndUpdate({ email: email }, { score: score });
        }

        res.json({
            success: true,
            message: `Score updated successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.CreateSystemUser = async (req, res) => {
    const { email, systemID } = req.body;
    const now = moment.tz('Asia/Kolkata');
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
            systemID,
            dateOfJoin: now.format()
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
        let systemUsers = await SystemUser.find().populate('userID', 'email name badge score');
        // Populate 'userID' field with 'email' and 'name' fields from the 'User' model
        res.status(200).json({
            success: true,
            data: systemUsers
        });
    } catch (error) {
        console.error("Error fetching system users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.allUser = async (req, res) => {
    try {
        let user = await User.find();
        console.log(user);
        let filteredUser = user.map(member => ({
            name: member.name,
            email: member.email,
            badge: member.badge,
            score: member.score
        }));

        res.status(200).json({
            success: true,
            data: filteredUser
        });
    } catch (error) {
        console.error("Error fetching system users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


