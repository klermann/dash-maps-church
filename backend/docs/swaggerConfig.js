// backend/docs/swaggerConfig.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Localizações',
      version: '1.0.0',
      description: 'API para listar localizações.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base do servidor
      },
    ],
  },
  apis: ['./backend/routes/*.js'], // Caminho para os arquivos com anotações das rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
