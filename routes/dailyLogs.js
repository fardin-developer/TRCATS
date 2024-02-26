const express = require('express');
const router = express.Router();
const {postDailyLog, lastSevenDaysScore,yourDailyData}= require('../Controller/dailyLogsController');
const jwtAuth = require('../middleware/jwtAuth');

router.route('/daily-log').post(jwtAuth, postDailyLog)
router.route('/week-score-history').get(lastSevenDaysScore)
router.route('/your-daily-data').get(yourDailyData)

module.exports = router