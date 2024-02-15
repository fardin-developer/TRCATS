const mongoose = require('mongoose');

const systemId = new mongoose.Schema({
    systemID:String
});


module.exports = mongoose.model('systemId',systemId);