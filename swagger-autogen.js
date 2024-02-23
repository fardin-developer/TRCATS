const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'TRCATS REST API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'trcats.fardindev.me',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);