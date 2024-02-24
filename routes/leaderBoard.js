const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const { allbadges,createBadge } = require('../Controller/leaderBoard');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });

  const upload = multer({ storage: storage });

  router.post('/create-badge', upload.single('img'), createBadge);
  router.route('/all-badges').get(allbadges);



module.exports = router;