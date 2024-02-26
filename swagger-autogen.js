const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'TRCATS REST API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'https://trcats-production.up.railway.app/api',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);