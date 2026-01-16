import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meu Motorista API',
      version: '1.0.0',
      description: 'API para gerenciamento de corridas - Plataforma Meu Motorista',
      contact: {
        name: 'API Support',
        email: 'support@meumotorista.com',
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
      schemas: {
        Ride: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único da corrida',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            rider_id: {
              type: 'string',
              description: 'ID do passageiro',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            driver_id: {
              type: 'string',
              description: 'ID do motorista (pode ser nulo se não aceito)',
              example: '660e8400-e29b-41d4-a716-446655440111',
              nullable: true,
            },
            pickup_location: {
              type: 'object',
              description: 'Coordenadas de pickup (GeoJSON)',
              properties: {
                latitude: {
                  type: 'number',
                  example: -23.5505,
                },
                longitude: {
                  type: 'number',
                  example: -46.6333,
                },
              },
            },
            destination_location: {
              type: 'object',
              description: 'Coordenadas de destino (GeoJSON)',
              properties: {
                latitude: {
                  type: 'number',
                  example: -23.6155,
                },
                longitude: {
                  type: 'number',
                  example: -46.7283,
                },
              },
            },
            pickup_address: {
              type: 'string',
              description: 'Endereço de pickup',
              example: 'Av. Paulista, 1000 - São Paulo, SP',
            },
            destination_address: {
              type: 'string',
              description: 'Endereço de destino',
              example: 'Rua da Consolação, 500 - São Paulo, SP',
            },
            status: {
              type: 'string',
              enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
              description: 'Status da corrida',
              example: 'requested',
            },
            fare: {
              type: 'number',
              description: 'Valor da corrida em reais',
              example: 45.50,
            },
            requested_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da solicitação',
              example: '2026-01-16T10:30:00Z',
            },
            started_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora do início',
              example: '2026-01-16T10:35:00Z',
              nullable: true,
            },
            completed_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da conclusão',
              example: '2026-01-16T10:55:00Z',
              nullable: true,
            },
          },
          required: [
            'id',
            'rider_id',
            'pickup_location',
            'destination_location',
            'pickup_address',
            'destination_address',
            'status',
            'fare',
            'requested_at',
          ],
        },
        RideRequest: {
          type: 'object',
          properties: {
            riderId: {
              type: 'string',
              description: 'ID do passageiro',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            pickup: {
              type: 'object',
              description: 'Coordenadas de pickup',
              properties: {
                latitude: {
                  type: 'number',
                  example: -23.5505,
                },
                longitude: {
                  type: 'number',
                  example: -46.6333,
                },
              },
              required: ['latitude', 'longitude'],
            },
            destination: {
              type: 'object',
              description: 'Coordenadas de destino',
              properties: {
                latitude: {
                  type: 'number',
                  example: -23.6155,
                },
                longitude: {
                  type: 'number',
                  example: -46.7283,
                },
              },
              required: ['latitude', 'longitude'],
            },
            pickupAddress: {
              type: 'string',
              description: 'Endereço de pickup',
              example: 'Av. Paulista, 1000 - São Paulo, SP',
            },
            destinationAddress: {
              type: 'string',
              description: 'Endereço de destino',
              example: 'Rua da Consolação, 500 - São Paulo, SP',
            },
          },
          required: ['riderId', 'pickup', 'destination', 'pickupAddress', 'destinationAddress'],
        },
        RideAccept: {
          type: 'object',
          properties: {
            driverId: {
              type: 'string',
              description: 'ID do motorista que aceita a corrida',
              example: '660e8400-e29b-41d4-a716-446655440111',
            },
          },
          required: ['driverId'],
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Corrida não encontrada',
            },
          },
          required: ['error'],
        },
        Health: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok',
            },
            message: {
              type: 'string',
              example: 'Uber Backend is running',
            },
          },
          required: ['status', 'message'],
        },
      },
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
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
