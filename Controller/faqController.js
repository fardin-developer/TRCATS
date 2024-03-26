// faqController.js

const FAQ = require('../Model/faqModel');

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.createFAQ = async (req, res) => {
  const { question, answer } = req.body;
  const faq = new FAQ({ question, answer });
  console.log('ohk');

  try {
    const savedFAQ = await faq.save();
    res.status(201).json(savedFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};