const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const { allbadges,createBadge,leaderBoardResult } = require('../Controller/leaderBoard');



  router.post('/create-badge', upload.single('img'), createBadge);
  router.route('/all-badges').get(allbadges);
  router.route('/leader-board-result').get(leaderBoardResult);



module.exports = router;