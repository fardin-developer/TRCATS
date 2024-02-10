const express = require('express');
const app = express();
require('dotenv').config()
const user = require('./routes/user');
const connectDB = require('./config/connectDB');
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
connectDB();

app.use('/',user)
let port = 3000
app.listen(port, () => {
    console.log(`server running at port ${port}`);
})
