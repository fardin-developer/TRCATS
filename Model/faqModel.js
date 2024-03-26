// faqModel.js

const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = FAQ;