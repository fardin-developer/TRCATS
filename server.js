const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const connectDB = require('./config/connectDB');

// Routes
const user = require('./routes/user');
const home = require('./routes/home');
const dailyLog = require('./routes/dailyLogs');
const instruction = require('./routes/instruct');
const sytemID = require('./routes/systemID');
const leaderBoard = require('./routes/leaderBoard');

const app = express();

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Swagger documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/uploads', express.static('uploads'));


// Database connection
connectDB();

// Routes
app.use('/api', user);
app.use('/api', home);
app.use('/api', dailyLog);
app.use('/api', instruction);
app.use('/api', sytemID);
app.use('/api', leaderBoard);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
