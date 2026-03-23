# Backend API

Express.js server for Bhautik's Developer Portfolio

## Setup

```bash
npm install
cp .env.example .env
node seed.js
npm run dev
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password

## API Routes

### Authentication
- POST /api/auth/login
- GET /api/auth/verify

### Projects
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects (protected)
- PUT /api/projects/:id (protected)
- DELETE /api/projects/:id (protected)

### Certificates
- GET /api/certificates
- POST /api/certificates (protected)
- PUT /api/certificates/:id (protected)
- DELETE /api/certificates/:id (protected)

### Messages
- GET /api/messages (protected)
- POST /api/messages
- DELETE /api/messages/:id (protected)

## Database Models

- Admin
- Project
- Certificate
- Message

All protected routes require JWT authentication via `Authorization: Bearer {token}` header.
