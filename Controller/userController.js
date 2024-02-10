const User = require('../Model/UserModel')
const moment = require('moment-timezone')

exports.CreateUser = async (req, res) => {
    const now = moment.tz('Asia/Kolkata')

    const { name, email, password, confirmPassword } = req.body
    console.log(name);
    try {
        let user = await User.findOne({ email })
        // console.log(now.format())
        if (!user) {
            user = new User({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                dateOfJoin: now.format()
            })
            await user.save()
            console.log('data saved successfully')
            return res.status(200).json({
                data: 'data saved successfully'
            })
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
