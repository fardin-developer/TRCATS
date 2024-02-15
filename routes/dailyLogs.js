const express = require('express');
const router = express.Router();
const {postDailyLog}= require('../Controller/dailyLogsController');
const jwtAuth = require('../middleware/jwtAuth');

router.route('/daily-log').post(jwtAuth, postDailyLog);

module.exports = router