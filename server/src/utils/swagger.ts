import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ECC -DSSB Code Challenge Server',
      version: '1.0.0',
      description: 'A simple ECC -DSSB Code Challenge Server API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const specs = swaggerJsDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
