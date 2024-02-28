const express = require('express');
const router = express.Router();
const home = require('../Model/homePageSchema')
const { homeRoute,homePost } = require('../Controller/homeController');

router.route('/home').get(homeRoute).post(homePost)



module.exports = router