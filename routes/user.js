const express = require('express');
const router = express.Router();
const { CreateUser,VerifyOtp,Login } = require('../Controller/userController');

router.route('/user/register').post(CreateUser)
router.route('/user/login').post(Login)
router.route('/user/verify-otp').post(VerifyOtp)


module.exports = router