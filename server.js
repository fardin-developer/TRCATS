const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const connectDB = require('./config/connectDB');

// Routes
const user = require('./routes/user');
const home = require('./routes/pageHome');
const dailyLog = require('./routes/dailyLogs');
const instruction = require('./routes/instruct');
const sytemID = require('./routes/systemID');
const leaderBoard = require('./routes/leaderBoard');
const about = require('./routes/pageAbout');
const policy = require('./routes/pagePrivacy')
const terms = require('./routes/pageTerms')
const faq = require('./routes/faq')

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
app.use('/v1', user);
app.use('/v1', home);
app.use('/v1', about);
app.use('/v1', dailyLog);
app.use('/v1', instruction);
app.use('/v1', sytemID);
app.use('/v1', leaderBoard);
app.use('/v1', policy);
app.use('/v1', terms);
app.use('/v1', faq);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
