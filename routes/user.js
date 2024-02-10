const express = require('express');
const router = express.Router();
const { CreateUser } = require('../Controller/userController');

router.route('/').post(CreateUser)


module.exports = router