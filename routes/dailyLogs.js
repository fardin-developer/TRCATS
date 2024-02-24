const express = require('express');
const router = express.Router();
const {postDailyLog, lastSevenDaysScore}= require('../Controller/dailyLogsController');
const jwtAuth = require('../middleware/jwtAuth');

router.route('/daily-log').get(lastSevenDaysScore).post(jwtAuth, postDailyLog)

module.exports = router