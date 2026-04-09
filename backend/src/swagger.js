const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ScentStory API Documentation',
      version: '1.0.0',
      description: 'API for the ScentStory personal fragrance discovery platform. Includes User Quiz and Admin Dashboard analytics.',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Main User Server (Quiz & Authentication)',
      },
      {
        url: 'http://admin.localhost:5001',
        description: 'Admin Subdomain Server (Reporting & Management)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token here to access protected routes.',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  console.log('📖 Swagger Docs available at http://127.0.0.1:5001/api-docs');
};

module.exports = setupSwagger;