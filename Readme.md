# Fitness Application Microservices Architecture

## Overview

This project implements a microservices-based fitness application with an API Gateway pattern. The system consists of three main services and a Nginx-based API Gateway for routing and load balancing.

## Architecture

### Services

1. **User Management Service**

   - Port: 3000
   - Endpoint: `/api/users/`
   - Handles user authentication, registration, and profile management
   - Rate limit: 10 requests/second with burst of 20

2. **Training Session Management Service**

   - Port: 3001
   - Endpoint: `/api/sessions/`
   - Manages training sessions and schedules
   - Rate limit: 10 requests/second with burst of 20

3. **Workout Recommendation Service**
   - Port: 8000
   - Endpoint: `/api/recommendations/`
   - Provides workout recommendations and calorie calculations
   - Rate limit: 10 requests/second with burst of 20

### API Gateway (Nginx)

- Handles routing to microservices
- Implements rate limiting
- Provides error handling
- Enables GZIP compression
- Manages request body size limits (100MB max)
- Health check endpoint available

## API Endpoints

### User Management

- `GET/POST /api/users/` - User operations
- Common endpoints include login, register, profile management

### Training Sessions

- `GET/POST /api/sessions/` - Session operations
- Manages training schedules and session data

### Workout Recommendations

- `GET/POST /api/recommendations/` - Recommendation operations
- `POST /api/recommendations/get-calories` - Calorie calculation endpoint

### System

- `GET /health` - Health check endpoint
- Returns `{"status":"UP"}` when system is operational

## Technical Features

### Security & Performance

- Rate limiting implemented for all services
- GZIP compression for text and JSON responses
- Request size limits configured
- Proxy headers for proper client IP forwarding
- Upgrade-capable WebSocket connections supported

### Error Handling

- Custom JSON responses for common HTTP errors
- 404 Not Found - Returns JSON error message
- 500 Server Error - Returns JSON error message

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Nginx
- Node.js (for user and training services)
- Python (for workout recommendation service)

### Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Start the services:
   ```bash
   docker-compose up
   ```
4. Access the services through:
   ```
   http://localhost/api/{service-endpoint}
   ```

### Health Check

Verify the system is running by accessing:
