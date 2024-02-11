const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: String,
    icon_url: String,
    desc: String
});

const homePageSchema = new mongoose.Schema({
    banner_url: String,
    title: String,
    items: [itemSchema]
});

// Create a model from the schema
const HomePage = mongoose.model('HomePage', homePageSchema);

module.exports = HomePage;
