import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meu Motorista - API Documentation',
      version: '1.0.0',
      description: 'API documentation for Meu Motorista backend services',
      contact: {
        name: 'Meu Motorista Support',
        url: 'https://github.com/meumotorista/backend',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.meumotorista.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authorization header using the Bearer scheme',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            phone: {
              type: 'string',
              description: 'User phone number',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        Driver: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Driver ID',
            },
            user_id: {
              type: 'string',
              description: 'Associated user ID',
            },
            license_number: {
              type: 'string',
              description: 'Driver license number',
            },
            rating: {
              type: 'number',
              format: 'float',
              description: 'Driver rating (0-5)',
            },
            total_rides: {
              type: 'integer',
              description: 'Total number of rides completed',
            },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Vehicle ID',
            },
            driver_id: {
              type: 'string',
              description: 'Associated driver ID',
            },
            make: {
              type: 'string',
              description: 'Vehicle make/brand',
            },
            model: {
              type: 'string',
              description: 'Vehicle model',
            },
            plate: {
              type: 'string',
              description: 'Vehicle license plate',
            },
            color: {
              type: 'string',
              description: 'Vehicle color',
            },
            year: {
              type: 'integer',
              description: 'Year of manufacture',
            },
          },
        },
        Ride: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Ride ID',
            },
            user_id: {
              type: 'string',
              description: 'Passenger user ID',
            },
            driver_id: {
              type: 'string',
              description: 'Driver ID',
            },
            pickup_location: {
              type: 'string',
              description: 'Pickup location address',
            },
            dropoff_location: {
              type: 'string',
              description: 'Dropoff location address',
            },
            pickup_lat: {
              type: 'number',
              format: 'float',
              description: 'Pickup latitude',
            },
            pickup_lng: {
              type: 'number',
              format: 'float',
              description: 'Pickup longitude',
            },
            dropoff_lat: {
              type: 'number',
              format: 'float',
              description: 'Dropoff latitude',
            },
            dropoff_lng: {
              type: 'number',
              format: 'float',
              description: 'Dropoff longitude',
            },
            status: {
              type: 'string',
              enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
              description: 'Ride status',
            },
            fare: {
              type: 'number',
              format: 'float',
              description: 'Ride fare amount',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Ride creation timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
            details: {
              type: 'string',
              description: 'Additional error details',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
