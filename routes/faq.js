const express = require('express');
const router = express.Router();
const faqController = require('../Controller/faqController');

router.get('/faq', faqController.getFAQs);
router.post('/faq', faqController.createFAQ);

module.exports = router;

