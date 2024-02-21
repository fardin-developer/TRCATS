const mongoose = require('mongoose');
const SystemUserScherma = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    systemID: {
        type: String,
        require: true
    }

});
const SystemUser = mongoose.model('SystemUser', SystemUserScherma);

module.exports = SystemUser;