const express = require('express');
const router = express.Router();
const home = require('../Model/homePageSchema')
const { instructionGet } = require('../Controller/instructionController');

router.route('/instruct').get(instructionGet);



module.exports = router