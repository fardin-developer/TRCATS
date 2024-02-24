require('dotenv').config();

const mongoose = require('mongoose');
const uri =process.env.URI || 'mongodb+srv://fardindeveloper1:Fardin379TRCATS973@cluster0.wwc5tks.mongodb.net/trcat';
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB;

