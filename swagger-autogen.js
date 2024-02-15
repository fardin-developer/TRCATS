const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'TRCATS REST API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'localhost:3000/api',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);