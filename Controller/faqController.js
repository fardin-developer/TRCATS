// faqController.js

const FAQ = require('../Model/faqModel');

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json({
      success: true,
      data: faqs
    });
  } catch (error) {
    res.json({ success:false,
      data:"server error"});
  }
};

exports.createFAQ = async (req, res) => {
  const { question, answer } = req.body;
  const faq = new FAQ({ question, answer });

  try {
    const savedFAQ = await faq.save();
    res.status(201).json({
      success: true,
      data: savedFAQ
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: "error message faq"
    });
  }
};