const mongoose = require('mongoose');

const systemId = new mongoose.Schema({
    name:String
});


module.exports = mongoose.model('systemId',systemId);