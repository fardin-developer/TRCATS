const express = require('express');
const router = express.Router();
const { CreateUser,VerifyOtp,Login,UpdateUser,CreateSystemUser,allSystemUser } = require('../Controller/userController');

router.route('/user/register').post(CreateUser);
router.route('/user/login').post(Login);
router.route('/user/update').post(UpdateUser);
router.route('/user/verify-otp').post(VerifyOtp);
router.route('/system-user/create').post(CreateSystemUser);
router.route('/system-users').get(allSystemUser);


module.exports = router