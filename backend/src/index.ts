/**
 * Express Server Entry Point
 *
 * Main server file that sets up the Express application with:
 * - Security middleware (Helmet, CORS, Rate Limiting)
 * - Request logging and monitoring
 * - API route organization
 * - Error handling and graceful shutdown
 * - Environment-based configuration
 *
 * The server provides a RESTful API for the e-commerce frontend
 * with proper security measures and performance optimizations.
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/error-handler.js';

// Import API route modules
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
// import stripeRoutes from './routes/stripe.routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip/brotli compression for all responses
app.use(compression({}) as unknown as express.RequestHandler);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

/**
 * Security Middleware Configuration
 *
 * Helmet helps secure Express apps by setting various HTTP headers.
 * It protects against well-known web vulnerabilities.
 */
app.use(helmet());

/**
 * CORS Configuration
 *
 * Enables Cross-Origin Resource Sharing to allow the frontend
 * to communicate with the backend API. Configured for security
 * while maintaining functionality.
 */
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8082',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://192.168.61.139:8080',
  'http://192.168.61.139:8082',
  'http://192.168.61.139:5173',
  'http://192.168.61.139:3000',
  process.env.FRONTEND_URL,
  // Add Vercel domains for production
  /https:\/\/.*\.vercel\.app$/,
  // Add Render domains for production
  /https:\/\/.*\.onrender\.com$/,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin matches any allowed pattern
      const isAllowed = allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === 'string') {
          return allowedOrigin === origin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/**
 * Rate Limiting Configuration
 *
 * Protects the API from abuse by limiting the number of requests
 * per IP address within a specified time window. Helps prevent
 * DDoS attacks and ensures fair usage.
 */
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

/**
 * Body Parsing Middleware
 *
 * Enables parsing of JSON and URL-encoded request bodies.
 * Limits request size to prevent memory exhaustion attacks.
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * Logging Middleware
 *
 * Provides HTTP request logging for monitoring and debugging.
 * Uses different log formats for development and production.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Colored output for development
} else {
  app.use(morgan('combined')); // Standard format for production
}

/**
 * Health Check Endpoint
 *
 * Provides a simple endpoint to check if the server is running
 * and get basic information about the environment.
 */
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

/**
 * API Routes Registration
 *
 * Organizes API endpoints by feature/domain for better maintainability.
 * Each route module handles a specific area of functionality.
 */
app.use('/api/auth', authRoutes); // Authentication endpoints
app.use('/api/products', productRoutes); // Product management
app.use('/api/cart', cartRoutes); // Shopping cart operations
// app.use('/api/stripe', stripeRoutes);  // Payment processing

/**
 * 404 Handler
 *
 * Catches all unmatched routes and returns a proper 404 response.
 * Must be placed before the error handler middleware.
 */
app.use(notFound);

/**
 * Global Error Handler
 *
 * Catches all errors thrown in the application and provides
 * consistent error responses. Must be the last middleware.
 */
app.use(errorHandler);

/**
 * Server Startup Function
 *
 * Initializes the server and handles startup errors gracefully.
 * Provides useful logging information about the server status.
 */
const startServer = async () => {
  try {
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 Network access: http://0.0.0.0:${PORT}/health`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Process Error Handlers
 *
 * Ensures graceful shutdown and proper error logging for
 * unhandled promise rejections and exceptions.
 */

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();
