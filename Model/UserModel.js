const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  systemIDs: [{ type: String }],
  dateOfJoin: {
    type: Date,
    required: true,
  },
  OTP:{
    type:Number,
  },
  OTPCreatedTime: { type: Date },
  OTPAttempts: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },

});

module.exports = mongoose.model('User', UserSchema);