# Swagger API Documentation

## Accessing the Documentation

The API documentation is available via Swagger UI at:

- **Development**: `http://localhost:3000/api-docs`
- **Production**: `https://api.meumotorista.com/api-docs`

## Features

The Swagger documentation includes:

- ✅ Complete API endpoint documentation
- ✅ Request/response schemas
- ✅ Authentication information (Bearer token)
- ✅ Error responses and status codes
- ✅ Interactive API testing
- ✅ Data models and examples

## API Endpoints

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Drivers (`/api/drivers`)
- `GET /vehicles` - Get driver's vehicles
- `POST /vehicles` - Add a new vehicle
- `PUT /vehicles/{id}` - Update vehicle information

### Rides (`/api/rides`)
- `POST /request` - Request a new ride
- `GET /available` - Get available rides
- `POST /{id}/accept` - Accept a ride
- `PATCH /{id}/status` - Update ride status
- `GET /my-rides` - Get my rides

## Authentication

All endpoints (except `/health`) require Bearer token authentication:

```
Authorization: Bearer <your_jwt_token>
```

## Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000/api-docs`

3. You can now explore and test all available endpoints

## Testing Endpoints

In Swagger UI, you can:

1. Click on any endpoint to expand it
2. Click "Try it out" button
3. Enter required parameters and request body
4. Click "Execute" to test the endpoint
5. View the response, status code, and headers

## Data Models

### User
- `id`: User identifier
- `name`: User's full name
- `email`: User's email address
- `phone`: User's phone number
- `avatar`: Avatar URL
- `created_at`: Creation timestamp

### Vehicle
- `id`: Vehicle identifier
- `driver_id`: Associated driver ID
- `make`: Vehicle brand
- `model`: Vehicle model
- `plate`: License plate
- `color`: Vehicle color
- `year`: Year of manufacture

### Ride
- `id`: Ride identifier
- `user_id`: Passenger user ID
- `driver_id`: Driver ID (null if not accepted yet)
- `pickup_location`: Pickup address
- `dropoff_location`: Dropoff address
- `pickup_lat`, `pickup_lng`: Pickup coordinates
- `dropoff_lat`, `dropoff_lng`: Dropoff coordinates
- `status`: Ride status (pending, accepted, in_progress, completed, cancelled)
- `fare`: Ride fare amount
- `created_at`: Creation timestamp

## Customizing Documentation

Edit [src/config/swagger.ts](src/config/swagger.ts) to:
- Update API information
- Add/modify servers
- Change component schemas
- Modify security schemes
