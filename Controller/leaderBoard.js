const User = require('../Model/UserModel');
const Badge = require('../Model/BadgeModel');
const path = require('path');
const fs = require('fs');


exports.allbadges = async (req, res) => {
    try {
        let data = await Badge.find();
        return res.json({
            success: true,
            data: data
        })
    } catch (error) {
        return res.json({
            success: false,
            data: "some thing went wrong"
        })
    }
}

exports.createBadge = async (req, res) => {
    // Access the uploaded image using req.file
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const bdgename = req.body.name;
        const existname = await Badge.findOne({ badgeName: bdgename });

        const fileName = req.file.filename;
        const fileUrl = `https://trcats.fardindev.me/uploads/${fileName}`;
        if (!existname) {
            const badge = new Badge({
                badgeName: req.body.name,
                imgUrl: fileUrl
            });
            let data = await badge.save();
            res.json({
                success: true,
                data: {
                    badgeName: data.badgeName,
                    imgUrl: data.imgUrl
                }
            })
        } else {
            const filePath = path.join(__dirname, '../uploads/', req.file.filename);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    res.json({
                        success: false,
                        data: {
                            message: "already exist",
                            badgeName: existname.badgeName,
                            imgUrl: existname.imgUrl
                        }
                    })
                }
            });
        }





    } catch (error) {
        res.json({
            success: false,
            data: "error in uploading image"
        })
    }


};

exports.leaderBoardResult = async (req, res) => {
    try {
        // Fetch all users and badges from the database
        let users = await User.find();
        let badges = await Badge.find();

        let usersByBadge = {};
        badges.forEach(badge => {
            usersByBadge[badge.badgeName] = [];
        });
        // console.log(usersByBadge);


        // Group users by their respective badges
        users.forEach(user => {
            if (usersByBadge[user.badge]) { 
                usersByBadge[user.badge].push({
                    name: user.name,
                    email: user.email,
                    score: user.score
                });
            } else {
                console.log(`User ${user.name} has an invalid badge: ${user.badge}`);
            }
        });

        res.status(200).json({
            success: true,
            data: usersByBadge
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
