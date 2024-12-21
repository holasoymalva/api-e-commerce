# E-commerce REST API

A scalable REST API for e-commerce projects built with Node.js, TypeScript, and PostgreSQL.

## Features

- 🔐 JWT Authentication & Authorization
- 📦 TypeScript support
- 🛢 PostgreSQL with TypeORM
- ✨ Clean Architecture
- 🔄 CRUD Operations
- 🚦 Request validation
- 🗃 Entity relationships
- 📝 Detailed logging
- 🔍 Error tracking
- 🛡 Security middleware

## Prerequisites

- Node.js >= 14.x
- PostgreSQL >= 12
- npm or yarn

## Project Structure

```
src/
├── config/         # Configuration files and environment setup
├── controllers/    # Request handlers
├── models/         # Database models/entities
├── routes/         # API routes definitions
├── services/       # Business logic
├── middlewares/    # Custom middleware functions
├── utils/          # Utility functions and helpers
└── app.ts         # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/holasoymalva/ecommerce-api.git
cd ecommerce-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:
```bash
npm run typeorm migration:run
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a single order
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a single user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, you need to include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## Error Handling

The API uses a centralized error handling mechanism. All errors include:
- Status code
- Error message
- Error stack trace (development only)

Example error response:
```json
{
  "status": "error",
  "message": "Product not found",
  "code": 404
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run typeorm` - Run TypeORM CLI commands

### Database Migrations

Generate a new migration:
```bash
npm run typeorm migration:generate -n MigrationName
```

Run pending migrations:
```bash
npm run typeorm migration:run
```

Revert last migration:
```bash
npm run typeorm migration:revert
```

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. Set production environment variables:
```env
NODE_ENV=production
```

3. Run database migrations:
```bash
npm run typeorm migration:run
```

4. Start the server:
```bash
npm start
```

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- API rate limiting is implemented
- CORS is configured for specified origins only
- SQL injection prevention through TypeORM
- Request validation for all inputs
- Security headers are set using helmet

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Support

For support, email support@yourdomain.com or open an issue in the repository.