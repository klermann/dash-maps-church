const swaggerJsDoc = require('swagger-jsdoc');
const authPaths = require('../paths/authPaths'); // Arquivo com as rotas de autenticação

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API com Autenticação e 2FA',
      version: '1.0.0',
      description: 'API para autenticação, 2FA e gerenciamento de localizações.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./backend/routes/*.js'], // Carrega rotas documentadas em outros arquivos
  paths: {
    ...authPaths, // Importa as rotas do módulo
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
