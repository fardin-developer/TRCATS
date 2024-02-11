const express = require('express');
const app = express();
require('dotenv').config()
const user = require('./routes/user');
const home = require('./routes/home')
const connectDB = require('./config/connectDB');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
connectDB();

app.use('/api',user);
app.use('/api',home)
// app.use('user/',user)
let port = 3000
app.listen(port, () => {
    console.log(`server running at port ${port}`);
})
