const express = require('express');
const router = express.Router();
const { CreateUser, VerifyOtp,allUser, Login, updateSystemID,updateScoreAll, CreateSystemUser, allSystemUser, updateBadge,updateBadgeAll,updateScore } = require('../Controller/userController');
   
router.route('/user/register').post(CreateUser);
router.route('/user/login').post(Login);
router.route('/user/update-systemID').post(updateSystemID);
router.route('/user/update-badge').post(updateBadge);
router.route('/user/update-badge-all').post(updateBadgeAll);
router.route('/user/update-score').post(updateScore);
router.route('/user/update-score-all').post(updateScoreAll);
router.route('/user/verify-otp').post(VerifyOtp);
router.route('/system-user/create').post(CreateSystemUser);
router.route('/system-users').get(allSystemUser);
router.route('/users').get(allUser);


module.exports = router