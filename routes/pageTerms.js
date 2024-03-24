const express = require('express');
const path = require('path');
const router = express.Router();

router.route('/terms-condtion').get((req, res) => {
   // Resolve the absolute path to PrivacyPolicy.html
   const filePath = path.resolve(__dirname, '../public/termsCondition.html');
   res.sendFile(filePath);
});

module.exports = router;
