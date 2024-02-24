const mongoose = require('mongoose');
const BadgesScherma = new mongoose.Schema({

    badgeName: {
        type: String,
        require: true
    },
    imgUrl:{
        type:String,
        require:true
    }

});
module.exports  = mongoose.model('Badge', BadgesScherma);

